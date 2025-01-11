import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindCategoryDto {
  @ApiProperty({ example: 1 })
  @IsNumberString()
  public page: number;

  @ApiProperty({ example: 10 })
  @IsNumberString()
  public total: number;
}
