import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsDbService } from './materials-db.service';

describe('MaterialsDbService', () => {
  let service: MaterialsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialsDbService],
    }).compile();

    service = module.get<MaterialsDbService>(MaterialsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
