import { SetMetadata } from '@nestjs/common';
import { Peermission } from './permission';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: Peermission[]) =>
        SetMetadata(PERMISSIONS_KEY, permissions);
