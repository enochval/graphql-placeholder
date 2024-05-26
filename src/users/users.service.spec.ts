import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './users.service';

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
