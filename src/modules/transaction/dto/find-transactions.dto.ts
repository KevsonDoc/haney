import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class FindTransactions {
  @ApiProperty({ example: 1 })
  @IsNumberString()
  public page: number;

  @ApiProperty({ example: 10 })
  @IsNumberString()
  public total: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  public startDate: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  public endDate: Date | null;
}
