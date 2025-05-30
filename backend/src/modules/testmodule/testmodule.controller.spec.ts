import { Test, TestingModule } from '@nestjs/testing';
import { TestmoduleController } from './testmodule.controller';
import { TestmoduleService } from './testmodule.service';

describe('TestmoduleController', () => {
  let controller: TestmoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestmoduleController],
      providers: [TestmoduleService],
    }).compile();

    controller = module.get<TestmoduleController>(TestmoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
