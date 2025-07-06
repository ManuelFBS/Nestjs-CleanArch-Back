import {
        Controller,
        Get,
        Post,
        Body,
        Param,
        Put,
        Delete,
        ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from '../../../../core/use-cases/employees/employee.service';
import {
        CreateEmployeeDTO,
        UpdateEmployeeDTO,
        EmployeeResponseDTO,
} from '../../../../application/dto/employees/create-employee.dto';
import { plainToInstance } from 'class-transformer';

@Controller('api/employees')
export class EmployeeController {
        constructor(private readonly employeeService: EmployeeService) {}

        @Post('employee/newemp')
        async create(
                @Body() createEmployeeDTO: CreateEmployeeDTO,
        ): Promise<EmployeeResponseDTO> {
                const employee =
                        await this.employeeService.createEmployee(
                                createEmployeeDTO,
                        );

                return plainToInstance(EmployeeResponseDTO, employee);
        }

        @Get()
        async findAll(): Promise<EmployeeResponseDTO[]> {
                const employees = await this.employeeService.findAllEmployees();

                return plainToInstance(EmployeeResponseDTO, employees);
        }

        @Get('employeebyid/:id')
        async findOne(
                @Param('id', ParseIntPipe) id: number,
        ): Promise<EmployeeResponseDTO> {
                const employee =
                        await this.employeeService.findEmployeeById(id);

                return plainToInstance(EmployeeResponseDTO, employee);
        }

        @Get('employeebydni/:dni')
        async findByDNI(
                @Param('dni') dni: string,
        ): Promise<EmployeeResponseDTO> {
                const employee =
                        await this.employeeService.findEmployeeByDni(dni);

                return plainToInstance(EmployeeResponseDTO, employee);
        }

        @Put('employeeupdate/:id')
        async update(
                @Param('id', ParseIntPipe) id: number,
                @Body() updateEmployeeDTO: UpdateEmployeeDTO,
        ): Promise<EmployeeResponseDTO> {
                const employee = await this.employeeService.updateEmployee(
                        id,
                        updateEmployeeDTO,
                );
                return plainToInstance(EmployeeResponseDTO, employee);
        }

        @Delete('employeedel/:id')
        async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
                await this.employeeService.deleteEmployee(id);
        }
}
