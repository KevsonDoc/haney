import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileService } from 'src/modules/user/profile.service';
import { CreatePaymentCardDto } from '../dto/create-payment-card.dto';
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
}
