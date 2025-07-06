import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../modules/users/user.module';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { AuthController } from '../auth/controllers/auth.controller';
import { TokenBlacklistService } from '../auth/token/token-blacklist.service';
import { RedisModule } from '../shared/redis/redis.module';

@Module({
        imports: [
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.register({
                        secret: process.env.JWT_SECRET,
                        signOptions: {
                                expiresIn: process.env.JWT_EXPIRES_IN || '8h',
                        },
                }),
                UserModule,
                RedisModule,
        ],
        providers: [AuthService, JWTStrategy, TokenBlacklistService],
        controllers: [AuthController],
        exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
