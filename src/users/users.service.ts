import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
      
      async findOne(username:string):Promise<User | undefined>
      {
        const query =  this.usersRepository.createQueryBuilder('user')
        .where('user.username= :username', {username})
        .leftJoinAndSelect('user.roles','role')
        .leftJoinAndSelect('role.permissions', 'rolePermission')
        .leftJoinAndSelect('user.permissions','permission');

        console.log("Hi! i am findone method in user service : ",await query.getOne());

        return await query.getOne();

      }


      async findMany()
      {
        return this.usersRepository.createQueryBuilder('user').getMany();
      }

      async create(userDto:CreateUserDto):Promise<User>
      {
        const salt = await bcrypt.genSalt();
        console.log("hi i am salt here : ",salt)
        const hashedPassword = await bcrypt.hash(userDto.password, salt);
        const user = this.usersRepository.create({...userDto,password:hashedPassword})
        console.log("Hi, i am create method in user service : ",user);
        return this.usersRepository.save(user);
      }

      async update(userId:number, dto:UpdateUserDto)
      {
        const user = await this.usersRepository.findOne({where:{id:userId}})

        console.log("Hi! i am update emthod in user service : ",user);

        const {roles,permissions} = dto;

        user.roles=roles ?? user.roles;
        user.permissions=permissions ?? user.permissions;

        return await this.usersRepository.save(user);

      }
}

