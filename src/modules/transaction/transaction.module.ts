import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controllers/category.controller';
import { TransactionController } from './controllers/transaction.controller';
import { Category, CategorySchema } from './entities/category.entity';
import { Invoice, InvoiceSchema } from './entities/invoice.entity';
import { CategoryService } from './service/category.service';
import { TransactionService } from './service/transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
  ],
  controllers: [CategoryController, TransactionController],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule {}
