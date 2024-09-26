import { Controller, Post } from '@nestjs/common';
import { FakerService } from './faker.service';

@Controller('faker')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}

  @Post()
  async populateDb()
  {
    return await this.fakerService.setUpForDemo();
  }
}
