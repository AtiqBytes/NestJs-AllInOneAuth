import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CLientRole } from "../enums/role.enum";


@Entity()
export class Role
{
@PrimaryGeneratedColumn()
id:number;

@Column({unique:true})
name:CLientRole;

}