import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/modules/user/entities/profile.entity';

export type PaymentCardDocument = HydratedDocument<PaymentCard>;

export class PaymentCard {
  @Prop()
  public title: string;

  public finalNumber: string;

  @Prop({ required: true, default: Date.now })
  public createdAt: Date;

  @Prop({ default: null })
  public updatedAt: Date | null;

  @Prop({ default: null })
  public deletedAt: Date | null;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  })
  public profile: Profile;
}

export const PaymentCardSchema = SchemaFactory.createForClass(PaymentCard);
