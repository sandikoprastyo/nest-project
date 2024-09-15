import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
            update: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined create', () => {
    expect(service.create).toBeDefined();
  });

  it('should be defined findAll', () => {
    expect(service.findAll).toBeDefined();
  });

  it('should be defined findOne', () => {
    expect(service.findOne).toBeDefined();
  });

  it('should be defined remove', () => {
    expect(service.remove).toBeDefined();
  });

  it('should be defined update', () => {
    expect(service.update).toBeDefined();
  });
});
