import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Require_id } from 'mongoose';
import { ProfileService } from 'src/modules/user/service/profile.service';
import { CreatePaymentCardDto } from '../dto/create-payment-card.dto';
import { FindPaymentCardDto } from '../dto/find-payment.dto';
import { PaymentCard } from '../entities/payment-card.entity';

@Injectable()
export class PaymentCardService {
  constructor(
    @InjectModel(PaymentCard.name)
    private readonly paymentCard: Model<PaymentCard>,

    private readonly profileService: ProfileService,
  ) {}

  public async create(profileId: string, data: CreatePaymentCardDto) {
    const profile = await this.profileService.findOne(profileId);

    try {
      const paymentCard = new this.paymentCard({
        ...data,
        profile: profile._id,
      });

      await paymentCard.save();
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException([
        'An error occurred while creating the payment card',
      ]);
    }
  }

  public async find(profileId: string, data: FindPaymentCardDto) {
    const limit = +data.total;
    const skip = (+data.page - 1) * limit;

    const paymentCard = await this.paymentCard
      .find({ profile: profileId })
      .limit(limit)
      .skip(skip);

    return paymentCard;
  }

  public async findOneUnsafe(
    paymentCardId: string,
  ): Promise<FlattenMaps<Require_id<PaymentCard>>> {
    const payment = await this.paymentCard
      .findById(paymentCardId)
      .where('deletedAt')
      .equals(null)
      .exec();

    if (!payment) {
      throw new BadRequestException('Invalid payment card');
    }

    return payment.toJSON();
  }
}
