import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'This is optional property',
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsInt()
  @IsNotEmpty()
  readonly quantity: number;
}
