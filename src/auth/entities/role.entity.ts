import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CLientRole } from "../enums/role.enum";
import { Permission } from "./permission.entity";
import { User } from "src/users/entities/user.entity";


@Entity()
export class Role
{
@PrimaryGeneratedColumn()
id:number;

@Column({unique:true})
name:CLientRole;

@ManyToMany(()=>Permission)
@JoinTable()
permissions:Permission[];

@ManyToMany(()=>User,(user)=>user.roles)
users:User[];

}