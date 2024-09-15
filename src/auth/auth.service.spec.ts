import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined validateUser', () => {
    expect(service.validateUser).toBeDefined();
  });

  it('should be defined login', () => {
    expect(service.login).toBeDefined();
  });

  it('should be defined signUp', () => {
    expect(service.signUp).toBeDefined();
  });
});
