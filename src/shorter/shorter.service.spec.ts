import { Test, TestingModule } from '@nestjs/testing';
import { ShorterService } from './shorter.service';

describe('ShorterService', () => {
  let service: ShorterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShorterService],
    }).compile();

    service = module.get<ShorterService>(ShorterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
