import {
        Injectable,
        ConflictException,
        NotFoundException,
        Inject,
} from '@nestjs/common';
import { Employee } from '../../../core/entities/employees/employee.entity';
import { PrismaEmployeeRepository } from 'src/infrastructure/repositories/employees/prisma-employee.repository';
import {
        CreateEmployeeDTO,
        UpdateEmployeeDTO,
} from '../../dto/employees/create-employee.dto';

@Injectable()
export class EmployeeService {
        constructor(
                @Inject('EmployeeRepository')
                private readonly prismaEmployeeRepository: PrismaEmployeeRepository,
        ) {}

        async createEmployee(
                createEmployeeDTO: CreateEmployeeDTO,
        ): Promise<Employee> {
                //* Validar DNI único...
                if (
                        await this.prismaEmployeeRepository.existsWithDni(
                                createEmployeeDTO.dni,
                        )
                ) {
                        throw new ConflictException(
                                'El DNI ya está registrado',
                        );
                }

                //* Validar email único...
                if (
                        await this.prismaEmployeeRepository.existsWithEmail(
                                createEmployeeDTO.email,
                        )
                ) {
                        throw new ConflictException(
                                'El email ya está registrado',
                        );
                }

                const employee = new Employee(
                        0,
                        createEmployeeDTO.dni,
                        createEmployeeDTO.name,
                        createEmployeeDTO.lastName,
                        createEmployeeDTO.email,
                        createEmployeeDTO.phone,
                        new Date(),
                        new Date(),
                );

                return this.prismaEmployeeRepository.create(employee);
        }

        async findAllEmployees(): Promise<Employee[]> {
                return this.prismaEmployeeRepository.findAll();
        }

        async findEmployeeById(id: number): Promise<Employee> {
                const employee =
                        await this.prismaEmployeeRepository.findByID(id);
                if (!employee) {
                        throw new NotFoundException(
                                `Empleado con ID ${id} no encontrado`,
                        );
                }
                return employee;
        }

        async updateEmployee(
                id: number,
                updateEmployeeDto: UpdateEmployeeDTO,
        ): Promise<Employee> {
                //* Verificar existencia...
                await this.findEmployeeById(id);

                //* Validar email único si se está actualizando...
                if (
                        updateEmployeeDto.email &&
                        (await this.prismaEmployeeRepository.existsWithEmail(
                                updateEmployeeDto.email,
                        ))
                ) {
                        throw new ConflictException(
                                'El email ya está registrado',
                        );
                }

                return this.prismaEmployeeRepository.update(
                        id,
                        updateEmployeeDto,
                );
        }

        async deleteEmployee(id: number): Promise<void> {
                //* Verificar existencia...
                await this.findEmployeeById(id);
                await this.prismaEmployeeRepository.delete(id);
        }

        async findEmployeeByDni(dni: string): Promise<Employee> {
                const employee =
                        await this.prismaEmployeeRepository.findByDNI(dni);

                if (!employee) {
                        throw new NotFoundException(
                                `Empleado con DNI ${dni} no encontrado`,
                        );
                }
                return employee;
        }
}
