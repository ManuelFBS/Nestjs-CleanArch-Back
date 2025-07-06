import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JWTPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
        constructor(private readonly authService: AuthService) {
                super({
                        jwtFromRequest:
                                ExtractJwt.fromAuthHeaderAsBearerToken(),
                        ignoreExpiration: false,
                        secretOrKey:
                                process.env.JWT_SECRET || 'fallback-secret-key',
                });
        }

        async validate(payload: JWTPayload) {
                return this.authService.validateUserByPayload(payload);
        }
}
