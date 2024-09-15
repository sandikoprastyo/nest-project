// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(newProduct);
  }

// Retrieve all products with pagination and search
async findAll(page: number, limit: number, search: string): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
  const [data, total] = await this.productsRepository.findAndCount({
    where: search ? { name: Like(`%${search}%`) } : {},
    take: limit,
    skip: (page - 1) * limit,
  });

  return {
    data,
    total,
    page,
    limit,
  };
}

  // Retrieve a product by its ID
  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ id });
  }

  // Update a product by its ID
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  // Remove a product by its ID
  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
