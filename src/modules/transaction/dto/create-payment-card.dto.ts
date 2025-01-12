import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePaymentCardDto {
  @ApiProperty({ example: 'Cartão virtual inter' })
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ example: 1234 })
  @IsNotEmpty()
  @MaxLength(4)
  public finalNumber: string;
}
