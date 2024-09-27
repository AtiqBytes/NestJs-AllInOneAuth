import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLientRole } from '../enums/role.enum';
import { ROLES_METADATA_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredClientRoles = this.reflector.get<CLientRole[]>(ROLES_METADATA_KEY, context.getHandler());

    if (!requiredClientRoles || requiredClientRoles.length == 0) {
      return true;
    }
    
    const {user} = context.switchToHttp().getRequest();
  
    const hasRequiredRoles = (user.roles).some((role)=>{
        requiredClientRoles.includes(role.name);
    })

    return hasRequiredRoles;
  }
}