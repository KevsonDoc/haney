import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction/:profileId')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  public async create(
    @Param('profileId') profileId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    await this.transactionService.create(profileId, createTransactionDto);
    return ['Invoice created successfully'];
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }
}
