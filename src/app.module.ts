import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/http/controllers/users/user.controller';
import { UserService } from './core/use-cases/users/user.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/users/prisma-user.repository';

@Module({
        imports: [],
        controllers: [UserController],
        providers: [
                UserService,
                PrismaService,
                {
                        provide: 'UserRepository',
                        useClass: PrismaUserRepository,
                },
        ],
})
export class AppModule {}
