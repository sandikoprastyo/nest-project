import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: null
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined create', () => {
    expect(controller.create).toBeDefined();
  });

  it('should be defined findAll', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('should be defined findOne', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('should be defined update', () => {
    expect(controller.update).toBeDefined();
  });

  it('should be defined remove', () => {
    expect(controller.remove).toBeDefined();
  });
});
