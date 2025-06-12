import { Test, TestingModule } from '@nestjs/testing';
import { FormatStratasController } from './format-stratas.controller';
import { FormatStratasService } from './format-stratas.service';

describe('FormatStratasController', () => {
  let controller: FormatStratasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatStratasController],
      providers: [FormatStratasService],
    }).compile();

    controller = module.get<FormatStratasController>(FormatStratasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
