import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


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

        return await query.getOne();
      }

      async create(userDto:CreateUserDto):Promise<User>
      {
        const salt = await bcrypt.genSalt();
        console.log("hi i am salt here : ",salt)
        const hashedPassword = await bcrypt.hash(userDto.password, salt);
        const user = this.usersRepository.create({...userDto,password:hashedPassword})
        return this.usersRepository.save(user);
      }
}

