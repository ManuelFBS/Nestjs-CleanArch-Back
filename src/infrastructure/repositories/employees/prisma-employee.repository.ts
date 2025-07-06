import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Employee } from '../../../core/entities/employees/employee.entity';
import { EmployeeRepository } from '../../../core/repositories/employees/employee.repository';

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
        constructor(private readonly prisma: PrismaService) {}

        private toDomain(prismaEmployee: any): Employee {
                return new Employee(
                        prismaEmployee.id,
                        prismaEmployee.dni,
                        prismaEmployee.name,
                        prismaEmployee.lastName,
                        prismaEmployee.email,
                        prismaEmployee.phone,
                        prismaEmployee.createdAt,
                        prismaEmployee.updatedAt,
                );
        }

        async create(employee: Employee): Promise<Employee> {
                const created = await this.prisma.employee.create({
                        data: {
                                dni: employee.dni,
                                name: employee.name,
                                lastName: employee.lastName,
                                email: employee.email,
                                phone: employee.phone,
                        },
                });

                return this.toDomain(created);
        }

        async findAll(): Promise<Employee[]> {
                const employees = await this.prisma.employee.findMany();
                return employees.map((employee) => this.toDomain(employee));
        }

        async findByID(id: number): Promise<Employee | null> {
                const employee = await this.prisma.employee.findUnique({
                        where: { id },
                });
                return employee ? this.toDomain(employee) : null;
        }

        async findByDNI(dni: string): Promise<Employee | null> {
                const employee = await this.prisma.employee.findUnique({
                        where: { dni },
                });
                return employee ? this.toDomain(employee) : null;
        }

        async findByName(name: string): Promise<Employee[]> {
                const employees = await this.prisma.$queryRaw<
                        Array<{
                                id: number;
                                dni: string;
                                name: string;
                                lastName: string;
                                email: string;
                                phone: string;
                                createdAt: Date;
                                updatedAt: Date;
                        }>
                >`SELECT * FROM Employee WHERE LOWER(name) LIKE LOWER(${`%${name}%`})`;

                return employees.map((employee) => this.toDomain(employee));
        }

        async update(
                id: number,
                employee: Partial<Employee>,
        ): Promise<Employee> {
                const updated = await this.prisma.employee.update({
                        where: { id },
                        data: employee,
                });
                return this.toDomain(updated);
        }

        async delete(id: number): Promise<void> {
                await this.prisma.employee.delete({ where: { id } });
        }

        async existsWithEmail(email: string): Promise<boolean> {
                const count = await this.prisma.employee.count({
                        where: { email },
                });
                return count > 0;
        }

        async existsWithDni(dni: string): Promise<boolean> {
                const count = await this.prisma.employee.count({
                        where: { dni },
                });
                return count > 0;
        }
}
