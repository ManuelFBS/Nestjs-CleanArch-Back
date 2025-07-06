import { Module } from '@nestjs/common';
import { RedisModule } from './shared/redis/redis.module';
import { EmployeeController } from './infrastructure/http/controllers/employees/employee.controller';
import { EmployeeService } from './core/use-cases/employees/employee.service';
import { PrismaEmployeeRepository } from './infrastructure/repositories/employees/prisma-employee.repository';
import { UserController } from './infrastructure/http/controllers/users/user.controller';
import { UserService } from './core/use-cases/users/user.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/users/prisma-user.repository';

@Module({
        imports: [
                RedisModule.forRoot({
                        host: process.env.REDIS_HOST || 'localhost',
                        port: parseInt(process.env.REDIS_PORT || '6379', 10),
                        db: parseInt(process.env.REDIS_DB || '0', 10),
                        password: process.env.REDIS_PASSWORD || '',
                }),
        ],
        controllers: [UserController, EmployeeController],
        providers: [
                UserService,
                EmployeeService,
                PrismaService,
                {
                        provide: 'UserRepository',
                        useClass: PrismaUserRepository,
                },
                {
                        provide: 'EmployeeRepository',
                        useClass: PrismaEmployeeRepository,
                },
        ],
})
export class AppModule {}
