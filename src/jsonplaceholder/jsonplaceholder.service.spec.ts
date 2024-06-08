import { Test, TestingModule } from '@nestjs/testing';
import { JsonplaceholderService } from './jsonplaceholder.service';

describe('JsonplaceholderService', () => {
  let service: JsonplaceholderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonplaceholderService],
    }).compile();

    service = module.get<JsonplaceholderService>(JsonplaceholderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
