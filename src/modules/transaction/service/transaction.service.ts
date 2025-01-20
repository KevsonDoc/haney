import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { Model } from 'mongoose';
import { ProfileService } from 'src/modules/user/service/profile.service';
import { TIMEZONE_TOKEN } from 'src/util/timezone';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { FindTransactions } from '../dto/find-transactions.dto';
import { Invoice } from '../entities/invoice.entity';
import { CategoryService } from './category.service';
import { PaymentCardService } from './payment-card.service.service';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoice: Model<Invoice>,

    private readonly profileService: ProfileService,

    private readonly categoryService: CategoryService,

    private readonly paymentCardService: PaymentCardService,
  ) {}

  public async create(
    profileId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    const { categoryIds, paymentCardId, ...payload } = createTransactionDto;

    await this.profileService.findOne(profileId);
    await this.categoryService.validateCategory(categoryIds);
    await this.paymentCardService.findOneUnsafe(paymentCardId);

    try {
      await this.invoice.create({
        ...payload,
        profile: profileId,
        category: categoryIds,
        paymentCard: paymentCardId,
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException([
        'An error occurred while creating the invoice.',
      ]);
    }
  }

  public async find(profileId: string, data: FindTransactions) {
    try {
      const { startDate, endDate } = data;
      const startIvoiceDate = dayjs(startDate).tz(TIMEZONE_TOKEN.BRAZIL_01);
      const endIvoiceDate =
        dayjs(endDate).tz(TIMEZONE_TOKEN.BRAZIL_01) ??
        dayjs().tz(TIMEZONE_TOKEN.BRAZIL_01).startOf('month');

      const limit = +data.total;
      const skip = (+data.page - 1) * limit;

      console.log(startIvoiceDate.toDate());

      const invoice = await this.invoice
        .find({ profile: profileId })
        .limit(limit)
        .skip(skip)
        .gte('invoiceDate', endIvoiceDate.toDate())
        .lte('invoiceDate', startIvoiceDate.toDate())
        .populate('category')
        .exec();

      return invoice;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException([
        'An error occurred while creating the invoice.',
      ]);
    }
  }
}
