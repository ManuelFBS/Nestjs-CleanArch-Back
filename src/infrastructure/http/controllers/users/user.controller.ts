import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../../../../core/entities/users/user.entity';
import { UserService } from '../../../../core/use-cases/users/user.service';
import { CreateUserDTO } from '../../../../application/dto/users/create-user.dto';

@Controller('users')
export class UserController {
        constructor(private readonly userService: UserService) {}

        @Post('newuser')
        async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
                const user = new User(
                        0,
                        createUserDTO.dni,
                        createUserDTO.dni,
                        createUserDTO.username,
                        createUserDTO.role as any,
                        new Date(),
                        new Date(),
                );

                return this.userService.createUser(user);
        }
}
