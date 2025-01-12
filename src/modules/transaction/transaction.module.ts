import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controllers/category.controller';
import { PaymentCardController } from './controllers/payment-card.controller';
import { TransactionController } from './controllers/transaction.controller';
import { Category, CategorySchema } from './entities/category.entity';
import { Invoice, InvoiceSchema } from './entities/invoice.entity';
import { PaymentCard, PaymentCardSchema } from './entities/payment-card.entity';
import { CategoryService } from './service/category.service';
import { PaymentCardService } from './service/payment-card.service.service';
import { TransactionService } from './service/transaction.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Invoice.name, schema: InvoiceSchema },
      { name: PaymentCard.name, schema: PaymentCardSchema },
    ]),
  ],
  controllers: [
    CategoryController,
    PaymentCardController,
    TransactionController,
  ],
  providers: [CategoryService, PaymentCardService, TransactionService],
})
export class TransactionModule {}
