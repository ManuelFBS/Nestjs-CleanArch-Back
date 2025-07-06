import { Injectable } from '@nestjs/common';
import { RedisService } from '../../shared/redis/redis.service';

@Injectable()
export class TokenBlacklistService {
        private readonly prefix = 'blacklist:';

        constructor(private readonly redis: RedisService) {}

        async addToBlacklist(token: string, expiry: number): Promise<void> {
                const now = Math.floor(Date.now() / 1000);
                const ttl = expiry - now;

                if (ttl > 0) {
                        await this.redis.setEx(
                                `${this.prefix}${token}`,
                                '1',
                                ttl,
                        );
                }
        }

        async isBlacklisted(token: string): Promise<boolean> {
                const result = await this.redis.get(`${this.prefix}${token}`);
                return result === '1';
        }
}
