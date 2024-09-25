import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/auth/entities/permission.entity';
import { Role } from 'src/auth/entities/role.entity';
import { ClientPermission } from 'src/auth/enums/permission.enum';
import { CLientRole } from 'src/auth/enums/role.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class FakerService {

    constructor(private usersService:UsersService,
        @InjectRepository(Role)
        private roleRepository:Repository<Role>,

        @InjectRepository(Permission)
        private permissionRepository:Repository<Permission>
    ){}

    private async createPermissions(permissionNames:ClientPermission[]):Promise<Permission[]>
    {
        return Promise.all(
            permissionNames.map(async (name)=>{
                const permission=this.permissionRepository.create({name})
                return this.permissionRepository.save(permission)
            })
        )
    }

    private async createRole(data : {name : CLientRole;permissions:Permission[]})
    {
       const {name,permissions}=data;
       const role = this.roleRepository.create({name});
       role.permissions=permissions;
       return await this.roleRepository.save(role);
    }

    
    async setUpForDemo()
    {
        const permissions = await this .createPermissions([
            ClientPermission.CreateUser,
            ClientPermission.ReadUser,
            ClientPermission.Updateuser,
            ClientPermission.DeleteUser,
            ClientPermission.CreateAnnouncement,
            ClientPermission.UpdateAnnouncement,
        ]);


    





    }
}
