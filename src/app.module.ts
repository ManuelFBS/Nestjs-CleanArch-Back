import { Module } from '@nestjs/common';
import { EmployeeController } from './infrastructure/http/controllers/employees/employee.controller';
import { EmployeeService } from './core/use-cases/employees/employee.service';
import { PrismaEmployeeRepository } from './infrastructure/repositories/employees/prisma-employee.repository';
import { UserController } from './infrastructure/http/controllers/users/user.controller';
import { UserService } from './core/use-cases/users/user.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/users/prisma-user.repository';

@Module({
        imports: [],
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
