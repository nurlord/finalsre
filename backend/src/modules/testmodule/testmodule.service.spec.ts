import { Test, TestingModule } from '@nestjs/testing';
import { TestmoduleService } from './testmodule.service';

describe('TestmoduleService', () => {
  let service: TestmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestmoduleService],
    }).compile();

    service = module.get<TestmoduleService>(TestmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
