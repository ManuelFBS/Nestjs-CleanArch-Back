import { Injectable } from '@nestjs/common';
import { UserSessionRepository } from '../../../core/repositories/usersessions/prisma-user-session.repository';
import { UserSession } from '../../../core/entities/usersessions/user-session.entity';
import { CreateUserSessionDTO } from '../../dto/usersessions/create-user-session.dto';
import { UpdateUserSessionDTO } from '../../dto/usersessions/update-user-session.dto';

@Injectable()
export class UserSessionService {
        constructor(
                private readonly userSessionRepository: UserSessionRepository,
        ) {}

        /**
         * Creates a new user session when user logs in
         * @param createUserSessionDto - Data for creating the session
         * @returns Promise<UserSession> - The created session
         */
        async createSession(
                createUserSessionDto: CreateUserSessionDTO,
        ): Promise<UserSession> {
                // Create a new UserSession entity
                const userSession = new UserSession(
                        0, // ID will be assigned by the database
                        createUserSessionDto.dni,
                        createUserSessionDto.username,
                        createUserSessionDto.role,
                        new Date(createUserSessionDto.initDate),
                        createUserSessionDto.initHour,
                        null, // finalDate starts as null
                        null, // finalHour starts as null
                );

                // Save to database
                return await this.userSessionRepository.create(userSession);
        }

        /**
         * Updates the session end time when user logs out
         * @param updateUserSessionDto - Data for updating the session
         * @returns Promise<UserSession> - The updated session
         */
        async endSession(
                updateUserSessionDto: UpdateUserSessionDTO,
        ): Promise<UserSession> {
                const finalDate = new Date(updateUserSessionDto.finalDate);

                return await this.userSessionRepository.updateSessionEnd(
                        updateUserSessionDto.dni,
                        finalDate,
                        updateUserSessionDto.finalHour,
                );
        }

        /**
         * Gets all user sessions
         * @returns Promise<UserSession[]> - All sessions
         */
        async getAllSessions(): Promise<UserSession[]> {
                return await this.userSessionRepository.findAll();
        }

        /**
         * Gets the most recent session for a specific user by DNI
         * @param dni - User's DNI
         * @returns Promise<UserSession | null> - The session or null if not found
         */
        async getSessionByDNI(dni: string): Promise<UserSession | null> {
                return await this.userSessionRepository.findByDNI(dni);
        }

        /**
         * Gets the most recent session for a specific user by username
         * @param username - User's username
         * @returns Promise<UserSession | null> - The session or null if not found
         */
        async getSessionByUsername(
                username: string,
        ): Promise<UserSession | null> {
                return await this.userSessionRepository.findByUsername(
                        username,
                );
        }

        /**
         * Gets the current active session for a user (session without finalDate)
         * @param dni - User's DNI
         * @returns Promise<UserSession | null> - The active session or null if not found
         */
        async getActiveSession(dni: string): Promise<UserSession | null> {
                const session = await this.userSessionRepository.findByDNI(dni);

                // Check if the session is active (no finalDate)
                if (session && !session.finalDate) {
                        return session;
                }

                return null;
        }
}
