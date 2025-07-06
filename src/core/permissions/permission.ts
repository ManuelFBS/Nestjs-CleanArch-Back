import { UserRole } from '../entities/users/user.entity';

export type Peermission =
        | 'employee:create'
        | 'employee:read'
        | 'employee:update'
        | 'employee:delete'
        | 'user:create'
        | 'user:read'
        | 'user:update'
        | 'user:delete'
        | 'auth:login'
        | 'auth:logout';

export const RolePermissions: Record<UserRole, Peermission[]> = {
        [UserRole.OWNER]: [
                'employee:create',
                'employee:read',
                'employee:update',
                'employee:delete',
                'user:create',
                'user:read',
                'user:update',
                'user:delete',
                'auth:login',
                'auth:logout',
        ],
        [UserRole.ADMIN]: [
                'employee:create',
                'employee:read',
                'employee:update',
                'user:create',
                'user:read',
                'user:update',
                'auth:login',
                'auth:logout',
        ],
        [UserRole.EMPLOYEE]: [
                'employee:read',
                'user:read',
                'auth:login',
                'auth:logout',
        ],
};

export function hasPermission(
        role: UserRole,
        permission: Peermission,
): boolean {
        return RolePermissions[role].includes(permission);
}
