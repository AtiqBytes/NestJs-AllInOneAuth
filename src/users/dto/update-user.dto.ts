import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/auth/entities/role.entity';
import { Permission } from 'src/auth/entities/permission.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    roles?:Role[];
    permissions?:Permission[];
    
}
