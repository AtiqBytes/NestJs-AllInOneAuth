import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CLientRole } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.usersService.create(createUserDto);
  }


  @Get()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(CLientRole.Admin)
  findMany()
  {
    return this.usersService.findMany(); 
  }
}