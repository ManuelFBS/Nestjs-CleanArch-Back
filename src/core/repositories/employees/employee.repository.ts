import { Employee } from '../../entities/employees/employee.entity';

/**
 * Repositorio abstracto para la entidad Employee
 *
 * Define el contrato que debe implementar cualquier repositorio concreto
 * (ej: Prisma, TypeORM, etc.) independiente de la tecnología de persistencia
 */
export abstract class EmployeeRepository {
        /**
         * Crea un nuevo empleado
         * @param employee Datos del empleado a crear
         * @returns Empleado creado
         * @throws Error si el empleado ya existe
         */
        abstract create(employee: Employee): Promise<Employee>;

        /**
         * Obtiene todos los empleados
         * @returns Lista de empleados
         */
        abstract findAll(): Promise<Employee[]>;

        /**
         * Busca un empleado por ID
         * @param id ID del empleado
         * @returns Empleado encontrado o null
         */
        abstract findByID(id: number): Promise<Employee | null>;

        /**
         * Busca un empleado por DNI
         * @param dni DNI del empleado
         * @returns Empleado encontrado o null
         */
        abstract findByDNI(dni: string): Promise<Employee | null>;

        /**
         * Busca empleados por nombre
         * @param name Nombre o parte del nombre
         * @returns Lista de empleados coincidentes
         */
        abstract findByName(name: string): Promise<Employee[]>;

        /**
         * Actualiza un empleado
         * @param id ID del empleado a actualizar
         * @param employee Datos parciales para actualizar
         * @returns Empleado actualizado
         * @throws Error si el empleado no existe
         */
        abstract update(
                id: number,
                employee: Partial<Employee>,
        ): Promise<Employee>;

        /**
         * Elimina un empleado
         * @param id ID del empleado a eliminar
         * @returns void
         * @throws Error si el empleado no existe
         */
        abstract delete(id: number): Promise<void>;

        /**
         * Verifica si existe un empleado con el email dado
         * @param email Email a verificar
         * @returns true si el email ya está en uso
         */
        abstract existsWithEmail(email: string): Promise<boolean>;

        /**
         * Verifica si existe un empleado con el DNI dado
         * @param dni DNI a verificar
         * @returns true si el DNI ya está en uso
         */
        abstract existsWithDni(dni: string): Promise<boolean>;
}
