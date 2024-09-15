import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CategoryId: number;

  @Column()
  categoryName: string;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  weight: number;

  @Column('decimal')
  width: number;

  @Column('decimal')
  length: number;

  @Column('decimal')
  height: number;

  @Column()
  image: string;

  @Column('decimal')
  price: number;
}
