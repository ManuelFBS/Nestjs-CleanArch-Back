import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../core/use-cases/users/user.service';
import { User } from '../core/entities/users/user.entity';
// import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
// import { TokenBlacklistService } from './token-blacklist.service';
