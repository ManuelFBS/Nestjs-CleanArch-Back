import { User } from '../../entities/users/user.entity';

export abstract class UserRepository {
        abstract create(user: User): Promise<User>;
        abstract findByDNI(dni: string): Promise<User | null>;
}
