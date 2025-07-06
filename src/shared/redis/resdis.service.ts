import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
        private readonly client: Redis;

        constructor(options?: { host: string; port: number }) {
                this.client = new Redis({
                        host:
                                options?.host ||
                                process.env.REDIS_HOST ||
                                'localhost',
                        port:
                                options?.port ||
                                parseInt(process.env.REDIS_PORT || '6379', 10),
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
