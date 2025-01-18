import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePaymentCardDto {
  @ApiProperty({ example: 'Cartão virtual inter' })
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ example: 1234 })
  @IsNotEmpty()
  @MaxLength(4)
  public finalNumber: string;

  @ApiProperty({ description: 'Data de vencimento da fatura' })
  @IsNotEmpty()
  @IsDateString()
  public invoiceDueDate: Date;

  @ApiProperty({ description: 'Data de fechamento da fatura' })
  @IsNotEmpty()
  @IsDateString()
  public invoiceClosingDate: Date;
}
