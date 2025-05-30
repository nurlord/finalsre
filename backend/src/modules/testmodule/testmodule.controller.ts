import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestmoduleService } from './testmodule.service';
import { CreateTestmoduleDto } from './dto/create-testmodule.dto';
import { UpdateTestmoduleDto } from './dto/update-testmodule.dto';

@Controller('testmodule')
export class TestmoduleController {
  constructor(private readonly testmoduleService: TestmoduleService) {}

  @Post()
  create(@Body() createTestmoduleDto: CreateTestmoduleDto) {
    return this.testmoduleService.create(createTestmoduleDto);
  }

  @Get()
  findAll() {
    return this.testmoduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testmoduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestmoduleDto: UpdateTestmoduleDto) {
    return this.testmoduleService.update(+id, updateTestmoduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testmoduleService.remove(+id);
  }
}
