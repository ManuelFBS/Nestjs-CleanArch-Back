import {
        IsEmail,
        IsNotEmpty,
        IsOptional,
        IsString,
        MinLength,
        MaxLength,
        Matches,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateEmployeeDTO {
        @ApiProperty({
                example: '12345678',
                description: 'DNI del empleado (único)',
                minLength: 6,
        })
        @IsString()
        @IsNotEmpty()
        @MinLength(6)
        @Matches(/^[0-9]+$/, { message: 'El DNI solo debe contener números' })
        dni: string;

        @ApiProperty({
                example: 'Juan',
                description: 'Nombre del empleado',
                minLength: 3,
                maxLength: 100,
        })
        @IsString()
        @IsNotEmpty()
        @MinLength(3)
        @MaxLength(100)
        name: string;

        @ApiProperty({
                example: 'Pérez',
                description: 'Apellido del empleado',
                minLength: 3,
                maxLength: 100,
        })
        @IsString()
        @IsNotEmpty()
        @MinLength(3)
        @MaxLength(100)
        lastName: string;

        @ApiProperty({
                example: 'juan.perez@empresa.com',
                description: 'Email del empleado (único)',
        })
        @IsEmail()
        @IsNotEmpty()
        email: string;

        @ApiProperty({
                example: '+5491145678901',
                description: 'Teléfono del empleado',
                minLength: 8,
                maxLength: 30,
        })
        @IsString()
        @IsNotEmpty()
        @MinLength(8)
        @MaxLength(30)
        phone: string;
}

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {
        @ApiProperty({ required: false })
        @IsOptional()
        name?: string;

        @ApiProperty({ required: false })
        @IsOptional()
        lastName?: string;

        @ApiProperty({ required: false })
        @IsOptional()
        @IsEmail()
        email?: string;

        @ApiProperty({ required: false })
        @IsOptional()
        phone?: string;
}

export class EmployeeResponseDTO {
        @ApiProperty()
        id: number;

        @ApiProperty()
        dni: string;

        @ApiProperty()
        name: string;

        @ApiProperty()
        lastName: string;

        @ApiProperty()
        email: string;

        @ApiProperty()
        phone: string;

        @ApiProperty()
        createdAt: Date;

        @ApiProperty()
        updatedAt: Date;
}

export class EmployeePublicResponseDTO {
        @ApiProperty()
        dni: string;

        @ApiProperty()
        name: string;

        @ApiProperty()
        lastName: string;

        @ApiProperty()
        email: string;

        @ApiProperty()
        phone: string;
}
