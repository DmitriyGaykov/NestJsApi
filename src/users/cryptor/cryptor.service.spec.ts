import { Test, TestingModule } from '@nestjs/testing';
import { CryptorService } from './cryptor.service';

describe('CryptorService', () => {
  let service: CryptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptorService],
    }).compile();

    service = module.get<CryptorService>(CryptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be gotten hash', async () => {
    expect(await service.toHash('123123123')).toBeDefined()
  })

  it('should be true', async() => {
    expect(await service.compareHash('123123123', '$2b$10$pkx6bnSInntQAJ15clehaOULH3713VFQIcIWexptg2RgqhRfukk0K')).toReturnWith(true)
  })

  it('should be false', async() => {
    expect(await service.compareHash('193123123', '2b$10$UlC7x7ORGv1cZke44wUYVe7fgatzkBz3gkgNbmIWYpZbAHYpdaKne')).toReturnWith(false)
  })
});
