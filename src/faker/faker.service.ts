import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/auth/entities/permission.entity';
import { Role } from 'src/auth/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class FakerService {

    constructor(private usersService:UsersService,
        @InjectRepository(Role)
        private roleRpository:Repository<Role>,

        @InjectRepository(Permission)
        private permissionRepository:Repository<Permission>
    ){}
}
