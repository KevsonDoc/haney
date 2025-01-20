import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { FindTransactions } from '../dto/find-transactions.dto';
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
  public async findAll(
    @Param('profileId') profileId: string,
    @Query() payload: FindTransactions,
  ) {
    const transactions = await this.transactionService.find(profileId, payload);

    return transactions;
  }
}
