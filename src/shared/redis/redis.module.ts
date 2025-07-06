import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

export interface RedisModuleOptions {
        host: string;
        port: number;
}

@Global()
@Module({})
export class RedisModule {
        static forRoot(options: RedisModuleOptions): DynamicModule {
                return {
                        module: RedisModule,
                        providers: [
                                {
                                        provide: 'REDIS_OPTIONS',
                                        useValue: options,
                                },
                                {
                                        provide: RedisService,
                                        useFactory: (
                                                redisOptions: RedisModuleOptions,
                                        ) => {
                                                return new RedisService(
                                                        redisOptions,
                                                );
                                        },
                                        inject: ['REDIS_OPTIONS'],
                                },
                        ],
                        exports: [RedisService],
                };
        }
}
