import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.usersService.create(createUserDto);
  }


  @Get()

  findMany(@CurrentUser() user:User)
  {
    return this.usersService.findMany(); 
  }
}