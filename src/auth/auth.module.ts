import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../modules/users/user.module';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
// import { AuthController } from './auth.controller';
