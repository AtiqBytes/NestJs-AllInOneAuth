import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLientRole } from '../enums/role.enum';
import { ROLES_METADATA_KEY } from '../decorators/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { ClientPermission } from '../enums/permission.enum';
import { PERMISSIONS_METADATA_KEY } from '../decorators/permissions.decorator';
import { getClientPermissions } from '../modifier/auth.modifier';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredClientPermissions = this.reflector.get<ClientPermission[]>(PERMISSIONS_METADATA_KEY, context.getHandler());

    if (!requiredClientPermissions || requiredClientPermissions.length == 0) {
      return true;
    }
    
    // const {user} = context.switchToHttp().getRequest();

    const req = context.switchToHttp().getRequest();
    const user: Partial<User> = req.user;

    const userPermissions=getClientPermissions(req.user)
    
    console.log('Required permissions:', requiredClientPermissions);
    console.log('User permissions:', user.permissions);
  

     if (!user || !user.permissions) {
      console.log('No permissions found on user object');
      return false;
    }
  
    const hasRequiredPermissions = requiredClientPermissions.some((permission)=>
      userPermissions.has(permission)
    )
    
    console.log('Has required permissions:', hasRequiredPermissions);

    return hasRequiredPermissions;
  }
}