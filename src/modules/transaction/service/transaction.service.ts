import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileService } from 'src/modules/user/service/profile.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Invoice } from '../entities/invoice.entity';
import { CategoryService } from './category.service';
import { PaymentCardService } from './payment-card.service.service';

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

  public async findAll() {
    return `This action returns all transaction`;
  }
}
