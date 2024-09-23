import { Module } from '@nestjs/common';
import { FakerService } from './faker.service';
import { FakerController } from './faker.controller';

@Module({
  controllers: [FakerController],
  providers: [FakerService],
})
export class FakerModule {}
