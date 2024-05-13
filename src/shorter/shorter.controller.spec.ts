import { Test, TestingModule } from '@nestjs/testing';
import { ShorterController } from './shorter.controller';
import { ShorterService } from './shorter.service';

describe('ShorterController', () => {
  let controller: ShorterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShorterController],
      providers: [ShorterService],
    }).compile();

    controller = module.get<ShorterController>(ShorterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
