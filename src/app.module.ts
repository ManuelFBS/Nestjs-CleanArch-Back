import { Module } from '@nestjs/common';
import { RedisModule } from './shared/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { EmployeeModule } from './modules/employees/employee.module';

@Module({
        imports: [
                RedisModule.forRoot({
                        host: process.env.REDIS_HOST || 'localhost',
                        port: parseInt(process.env.REDIS_PORT || '6379', 10),
                        db: parseInt(process.env.REDIS_DB || '0', 10),
                        password: process.env.REDIS_PASSWORD || '',
                }),
                AuthModule,
                UserModule,
                EmployeeModule,
        ],
        //? No se necesitan controllers ni providers aquí si ya están en los módulos...
})
export class AppModule {}
