import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesDbService } from './categories-db.service';

describe('CategoriesDbService', () => {
  let service: CategoriesDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesDbService],
    }).compile();

    service = module.get<CategoriesDbService>(CategoriesDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
