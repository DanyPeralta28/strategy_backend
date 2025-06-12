import { Test, TestingModule } from '@nestjs/testing';
import { FormatStratasService } from './format-stratas.service';

describe('FormatStratasService', () => {
  let service: FormatStratasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormatStratasService],
    }).compile();

    service = module.get<FormatStratasService>(FormatStratasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
