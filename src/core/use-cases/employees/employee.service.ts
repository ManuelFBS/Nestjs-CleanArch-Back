import {
        Injectable,
        ConflictException,
        NotFoundException,
        Inject,
} from '@nestjs/common';
import { Employee } from '../../entities/employees/employee.entity';
import { EmployeeRepository } from '../../repositories/employees/employee.repository';
import {
        CreateEmployeeDTO,
        UpdateEmployeeDTO,
} from '../../../application/dto/employees/create-employee.dto';

@Injectable()
export class EmployeeService {
        constructor(
                @Inject('EmployeeRepository')
                private readonly employeeRepository: EmployeeRepository,
        ) {}

        async createEmployee(
                createEmployeeDTO: CreateEmployeeDTO,
        ): Promise<Employee> {
                //* Validar DNI único...
                if (
                        await this.employeeRepository.existsWithDni(
                                createEmployeeDTO.dni,
                        )
                ) {
                        throw new ConflictException(
                                'El DNI ya está registrado',
                        );
                }

                //* Validar email único...
                if (
                        await this.employeeRepository.existsWithEmail(
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

                return this.employeeRepository.create(employee);
        }

        async findAllEmployees(): Promise<Employee[]> {
                return this.employeeRepository.findAll();
        }

        async findEmployeeById(id: number): Promise<Employee> {
                const employee = await this.employeeRepository.findByID(id);
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
                        (await this.employeeRepository.existsWithEmail(
                                updateEmployeeDto.email,
                        ))
                ) {
                        throw new ConflictException(
                                'El email ya está registrado',
                        );
                }

                return this.employeeRepository.update(id, updateEmployeeDto);
        }

        async deleteEmployee(id: number): Promise<void> {
                //* Verificar existencia...
                await this.findEmployeeById(id);
                await this.employeeRepository.delete(id);
        }

        async findEmployeeByDni(dni: string): Promise<Employee> {
                const employee = await this.employeeRepository.findByDNI(dni);

                if (!employee) {
                        throw new NotFoundException(
                                `Empleado con DNI ${dni} no encontrado`,
                        );
                }
                return employee;
        }
}
