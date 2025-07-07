import {
        Controller,
        Get,
        Post,
        Body,
        Param,
        Put,
        Delete,
        ParseIntPipe,
        UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../../../application/use-cases/users/user.service';
import {
        CreateUserDTO,
        UpdateUserDTO,
        UserResponseDTO,
} from '../../../../application/dto/users/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('api/users')
export class UserController {
        constructor(private readonly userService: UserService) {}

        @Post('newuser')
        async create(
                @Body() createUserDTO: CreateUserDTO,
        ): Promise<UserResponseDTO> {
                const user = await this.userService.createUser(createUserDTO);

                return plainToInstance(UserResponseDTO, user);
        }

        @Get()
        async findAll(): Promise<UserResponseDTO[]> {
                const users = await this.userService.findAllUsers();

                return plainToInstance(UserResponseDTO, users);
        }

        @Get('userbyid/:id')
        async findOne(
                @Param('id', ParseIntPipe) id: number,
        ): Promise<UserResponseDTO> {
                const user = await this.userService.findUserByID(id);

                return plainToInstance(UserResponseDTO, user);
        }

        @Get('userbydni/:dni')
        async findByDni(@Param('dni') dni: string): Promise<UserResponseDTO> {
                const user = await this.userService.findUserByDNI(dni);

                return plainToInstance(UserResponseDTO, user);
        }

        @Put('userupd/:id')
        async update(
                @Param('id', ParseIntPipe) id: number,
                @Body() updateUserDto: UpdateUserDTO,
        ): Promise<UserResponseDTO> {
                const user = await this.userService.updateUser(
                        id,
                        updateUserDto,
                );

                return plainToInstance(UserResponseDTO, user);
        }

        @Delete('userdel/:id')
        async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
                await this.userService.deleteUser(id);
        }

        @Post('login')
        async login(@Body() loginDto: { username: string; password: string }) {
                const user = await this.userService.validateUser(
                        loginDto.username,
                        loginDto.password,
                );
                if (!user) {
                        throw new UnauthorizedException(
                                'Credenciales inválidas',
                        );
                }
                //* Aquí deberías generar y retornar un token JWT...
                return plainToInstance(UserResponseDTO, user);
        }
}
