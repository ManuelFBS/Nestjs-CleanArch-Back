import {
        Controller,
        Get,
        Post,
        Body,
        Param,
        Put,
        Delete,
        UseGuards,
        ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from '../../../../application/use-cases/employees/employee.service';
import {
        CreateEmployeeDTO,
        UpdateEmployeeDTO,
        EmployeeResponseDTO,
        EmployeePublicResponseDTO,
} from '../../../../application/dto/employees/create-employee.dto';
import { JWTAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { Permissions } from '../../../../core/permissions/permissions.decorator';
import { PermissionsGuard } from '../../../../auth/guards/permissions.guard';
import { plainToInstance } from 'class-transformer';

@Controller('api/employees')
export class EmployeeController {
        constructor(private readonly employeeService: EmployeeService) {}

        @Post('employee/newemp')
        @UseGuards(JWTAuthGuard, PermissionsGuard)
        @Permissions('employee:create')
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
        @UseGuards(JWTAuthGuard, PermissionsGuard)
        @Permissions('employee:read')
        async findAll(): Promise<EmployeePublicResponseDTO[]> {
                const employees = await this.employeeService.findAllEmployees();

                //* Se ordena por 'dni' en forma ascendente...
                employees.sort((a, b) => Number(a.dni) - Number(b.dni));

                //* Se mapea y (opcionalmente) se transforma a instancia de DTO...
                return employees.map((emp) =>
                        plainToInstance(EmployeePublicResponseDTO, {
                                dni: emp.dni,
                                name: emp.name,
                                lastName: emp.lastName,
                                email: emp.email,
                                phone: emp.phone,
                        }),
                );
        }

        @Get('employeebyid/:id')
        @UseGuards(JWTAuthGuard, PermissionsGuard)
        @Permissions('employee:create', 'employee:read')
        async findOne(
                @Param('id', ParseIntPipe) id: number,
        ): Promise<EmployeeResponseDTO> {
                const employee =
                        await this.employeeService.findEmployeeById(id);

                return plainToInstance(EmployeeResponseDTO, employee);
        }

        @Get('employeebydni/:dni')
        @UseGuards(JWTAuthGuard, PermissionsGuard)
        @Permissions('employee:create', 'employee:read')
        async findByDNI(
                @Param('dni') dni: string,
        ): Promise<EmployeeResponseDTO> {
                const employee =
                        await this.employeeService.findEmployeeByDni(dni);

                return plainToInstance(EmployeeResponseDTO, employee);
        }

        @Put('employeeupdate/:id')
        @UseGuards(JWTAuthGuard, PermissionsGuard)
        @Permissions('employee:create', 'employee:read', 'employee:update')
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
        @UseGuards(JWTAuthGuard, PermissionsGuard)
        @Permissions('employee:create', 'employee:read', 'employee:delete')
        async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
                await this.employeeService.deleteEmployee(id);
        }
}
