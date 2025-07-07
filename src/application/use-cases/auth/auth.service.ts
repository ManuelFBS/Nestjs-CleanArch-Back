import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../../../core/entities/users/user.entity';
import { JWTPayload } from '../../../auth/interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { TokenBlacklistService } from '../../../auth/token/token-blacklist.service';

@Injectable()
export class AuthService {
        constructor(
                private readonly userService: UserService,
                private readonly jwtService: JwtService,
                private readonly tokenBlacklist: TokenBlacklistService,
        ) {}

        async validateUser(
                username: string,
                pass: string,
        ): Promise<User | null> {
                const user = await this.userService.findByUsername(username);
                if (!user) return null;

                const isMatch = await bcrypt.compare(pass, user.password);
                return isMatch ? user : null;
        }

        async validateUserByPayload(payload: JWTPayload): Promise<User> {
                const user = await this.userService.findUserByID(payload.sub);
                if (!user) {
                        throw new UnauthorizedException('Invalid token');
                }
                return user;
        }

        // eslint-disable-next-line @typescript-eslint/require-await
        async login(user: User) {
                const payload: JWTPayload = {
                        sub: user.id,
                        username: user.username,
                        role: user.role,
                };

                return {
                        access_token: this.jwtService.sign(payload),
                        user: {
                                id: user.id,
                                username: user.username,
                                role: user.role,
                        },
                };
        }

        async logout(token: string): Promise<void> {
                await this.tokenBlacklist.addToBlacklist(token);
        }
}
