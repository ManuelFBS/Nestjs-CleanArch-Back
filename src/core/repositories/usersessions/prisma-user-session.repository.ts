import { UserSession } from '../../entities/usersessions/user-session.entity';

export abstract class UserSessionRepository {
        abstract create(user: UserSession): Promise<UserSession>;
        abstract findAll(): Promise<UserSession[]>;
        abstract findByDNI(dni: string): Promise<UserSession | null>;
        abstract findByUsername(username: string): Promise<UserSession | null>;
}
