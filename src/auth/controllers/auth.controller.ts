import {
        Controller,
        Post,
        Body,
        UseGuards,
        Req,
        UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
// import { LoginDto } from '../dto/login.dto';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import { Permissions } from '../../core/permissions/permissions.decorator';
import { Permission } from '../../core/permissions/permission';

@Controller('api/auth')
export class AuthController {
        constructor(private readonly authService: AuthService) {}
        //
}
