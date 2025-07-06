import { Module } from '@nestjs/common';
import { EmployeeService } from '../../core/use-cases/employees/employee.service';
import { EmployeeController } from '../../infrastructure/http/controllers/employees/employee.controller';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { PrismaEmployeeRepository } from '../../infrastructure/repositories/employees/prisma-employee.repository';

@Module({
        controllers: [EmployeeController],
        providers: [
                EmployeeService,
                PrismaService,
                {
                        provide: 'EmployeeRepository',
                        useClass: PrismaEmployeeRepository,
                },
        ],
        exports: [EmployeeService],
})
export class EmployeeModule {}
