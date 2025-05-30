import { Module } from '@nestjs/common';
import { TestmoduleService } from './testmodule.service';
import { TestmoduleController } from './testmodule.controller';

@Module({
  controllers: [TestmoduleController],
  providers: [TestmoduleService],
})
export class TestmoduleModule {}
