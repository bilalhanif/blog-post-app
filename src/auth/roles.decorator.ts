// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/user.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
