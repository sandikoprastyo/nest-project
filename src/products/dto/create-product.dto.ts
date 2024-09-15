import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly CategoryId: number;

  @IsString()
  readonly categoryName: string;

  @IsString()
  readonly sku: string;

  @IsNumber()
  readonly weight: number;

  @IsNumber()
  readonly width: number;

  @IsNumber()
  readonly length: number;

  @IsNumber()
  readonly height: number;

  @IsString()
  readonly image: string;
}
