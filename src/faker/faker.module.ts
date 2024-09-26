import { Module } from '@nestjs/common';
import { FakerService } from './faker.service';
import { FakerController } from './faker.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { Role } from 'src/auth/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/auth/entities/permission.entity';

@Module({
 imports: [UsersModule,TypeOrmModule.forFeature([Role,Permission])],
  controllers: [FakerController],
  providers: [FakerService],
 
})
export class FakerModule {}
