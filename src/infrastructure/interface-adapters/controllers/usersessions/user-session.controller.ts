import {
        Controller,
        Post,
        Get,
        Body,
        Param,
        UseGuards,
        HttpStatus,
        HttpCode,
} from '@nestjs/common';
import { UserSessionService } from '../../../../application/use-cases/usersessions/user-session.service';
import { CreateUserSessionDTO } from '../../../../application/dto/usersessions/create-user-session.dto';
import { UpdateUserSessionDTO } from '../../../../application/dto/usersessions/update-user-session.dto';
import { JWTAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../auth/guards/permissions.guard';
import { Permissions } from '../../../../core/permissions/permissions.decorator';

@Controller('user-sessions')
@UseGuards(JWTAuthGuard, PermissionsGuard)
export class UserSessionController {
        constructor(private readonly userSessionService: UserSessionService) {}

        /**
         * Creates a new user session (called automatically during login)
         * @param createUserSessionDto - Session creation data
         * @returns Promise<UserSession> - The created session
         */
        @Post()
        @HttpCode(HttpStatus.CREATED)
        async createSession(
                @Body() createUserSessionDto: CreateUserSessionDTO,
        ) {
                return await this.userSessionService.createSession(
                        createUserSessionDto,
                );
        }

        /**
         * Ends a user session (called automatically during logout)
         * @param updateUserSessionDto - Session update data
         * @returns Promise<UserSession> - The updated session
         */
        @Post('end-session')
        @HttpCode(HttpStatus.OK)
        async endSession(@Body() updateUserSessionDto: UpdateUserSessionDTO) {
                return await this.userSessionService.endSession(
                        updateUserSessionDto,
                );
        }

        /**
         * Gets all user sessions (admin only)
         * @returns Promise<UserSession[]> - All sessions
         */
        @Get()
        @Permissions('sessions:read')
        async getAllSessions() {
                return await this.userSessionService.getAllSessions();
        }

        /**
         * Gets the most recent session for a specific user by DNI
         * @param dni - User's DNI
         * @returns Promise<UserSession | null> - The session or null if not found
         */
        @Get('dni/:dni')
        @Permissions('sessions:read')
        async getSessionByDNI(@Param('dni') dni: string) {
                return await this.userSessionService.getSessionByDNI(dni);
        }

        /**
         * Gets the most recent session for a specific user by username
         * @param username - User's username
         * @returns Promise<UserSession | null> - The session or null if not found
         */
        @Get('username/:username')
        @Permissions('sessions:read')
        async getSessionByUsername(@Param('username') username: string) {
                return await this.userSessionService.getSessionByUsername(
                        username,
                );
        }

        /**
         * Gets the most recent session for a specific user by username
         * @param dni - User's DNI
         * @returns Promise<UserSession | null> - The active session or null if not found
         */
        @Get('active/:dni')
        @Permissions('sessions:read')
        async getActiveSession(@Param('dni') dni: string) {
                return await this.userSessionService.getActiveSession(dni);
        }
}
