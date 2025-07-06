import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {
        //? se puede añadir lógica adicional aquí si es necesario...
        //? Ejemplo: manejo personalizado de errores...
}
