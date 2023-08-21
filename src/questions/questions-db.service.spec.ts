import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsDbService } from './questions-db.service';

describe('QuestionsDbService', () => {
  let service: QuestionsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsDbService],
    }).compile();

    service = module.get<QuestionsDbService>(QuestionsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
