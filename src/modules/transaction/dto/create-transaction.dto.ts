import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public invoiceValue: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  public recurrence: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public recurrenceCount: number | null;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  public invoiceDate: Date;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  public categoryIds: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  public paymentCardId: string | null;
}
