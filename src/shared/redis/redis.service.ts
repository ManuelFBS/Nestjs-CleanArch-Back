import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisModuleOptions } from './redis.module';

@Injectable()
export class RedisService {
        private readonly client: Redis;

        constructor(
                @Inject('REDIS_OPTIONS')
                private readonly options: RedisModuleOptions,
        ) {
                this.client = new Redis({
                        host: this.options.host,
                        port: this.options.port,
                        retryStrategy: (times) => {
                                const delay = Math.min(times * 50, 2000);
                                return delay;
                        },
                });

                this.client.on('error', (err) => {
                        console.error('Redis error:', err);
                });

                this.client.on('connect', () => {
                        console.log('Connected to Redis');
                });
        }

        //* Método para establecer valores con expiración en segundos...
        async setEx(
                key: string,
                value: string,
                duration: number,
        ): Promise<void> {
                await this.client.setex(key, duration, value);
        }

        //* Método para establecer valores con expiración en milisegundos...
        async setPx(
                key: string,
                value: string,
                duration: number,
        ): Promise<void> {
                await this.client.set(key, value, 'PX', duration);
        }

        //* Método para establecer valores solo si no existen...
        async setNx(key: string, value: string): Promise<boolean> {
                const result = await this.client.set(key, value, 'NX');
                return result === 'OK';
        }

        //* Método para establecer valores solo si ya existen...
        async setXx(key: string, value: string): Promise<boolean> {
                const result = await this.client.set(key, value, 'XX');
                return result === 'OK';
        }

        //* Método básico para establecer valores...
        async set(key: string, value: string): Promise<void> {
                await this.client.set(key, value);
        }

        async get(key: string): Promise<string | null> {
                return this.client.get(key);
        }

        async del(key: string): Promise<void> {
                await this.client.del(key);
        }
}
