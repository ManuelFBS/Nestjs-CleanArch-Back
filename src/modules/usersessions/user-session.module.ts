import { Module } from '@nestjs/common';
import { UserSessionController } from '../../infrastructure/interface-adapters/controllers/usersessions/user-session.controller';
import { UserSessionService } from '../../application/use-cases/usersessions/user-session.service';
import { PrismaUserSessionRepository } from '../../infrastructure/repositories/usersessions/prisma-user-session.repository';
import { UserSessionRepository } from '../../core/repositories/usersessions/prisma-user-session.repository';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';

@Module({
        imports: [PrismaModule],
        controllers: [UserSessionController],
        providers: [
                UserSessionService,
                {
                        provide: UserSessionRepository,
                        useClass: PrismaUserSessionRepository,
                },
        ],
        exports: [UserSessionService, UserSessionRepository],
})
export class UserSessionModule {}
