import { Role } from "src/auth/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn()
 id:number;

 @Column({unique:true})
 username:string;

 @Column({unique:true})
 email:string;

 @Column()
 password:string;

 @ManyToMany(()=>Role)
 @JoinTable()
 roles:Role[];
    
}
