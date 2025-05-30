import { Injectable } from '@nestjs/common';
import { CreateTestmoduleDto } from './dto/create-testmodule.dto';
import { UpdateTestmoduleDto } from './dto/update-testmodule.dto';

@Injectable()
export class TestmoduleService {
  create(createTestmoduleDto: CreateTestmoduleDto) {
    return 'This action adds a new testmodule';
  }

  findAll() {
    return `This action returns all testmodule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testmodule`;
  }

  update(id: number, updateTestmoduleDto: UpdateTestmoduleDto) {
    return `This action updates a #${id} testmodule`;
  }

  remove(id: number) {
    return `This action removes a #${id} testmodule`;
  }
}
