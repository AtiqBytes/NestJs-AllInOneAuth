import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLientRole } from '../enums/role.enum';
import { ROLES_METADATA_KEY } from '../decorators/roles.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredClientRoles = this.reflector.get<CLientRole[]>(ROLES_METADATA_KEY, context.getHandler());

    if (!requiredClientRoles || requiredClientRoles.length == 0) {
      return true;
    }
    
    // const {user} = context.switchToHttp().getRequest();

    const req = context.switchToHttp().getRequest();
    const user: Partial<User> = req.user;
    
    console.log('Required roles:', requiredClientRoles);
    console.log('User roles:', user.roles);

     if (!user || !user.roles) {
      console.log('No roles found on user object');
      return false;
    }
  
    const hasRequiredRoles = (user.roles ?? []).some((role)=>
        requiredClientRoles.includes(role.name)
    )
    console.log('Has required roles:', hasRequiredRoles);

    return hasRequiredRoles;
  }
}