import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/modules/user/entities/profile.entity';

export type PaymentCardDocument = HydratedDocument<PaymentCard>;

@Schema()
export class PaymentCard {
  @Prop()
  public title: string;

  @Prop()
  public finalNumber: string;

  @Prop()
  public invoiceDueDate: Date;

  @Prop()
  public invoiceClosingDate: Date;

  @Prop({ required: true, default: Date.now })
  public createdAt: Date;

  @Prop({ default: null })
  public updatedAt: Date | null;

  @Prop({ default: null })
  public deletedAt: Date | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  public profile: Profile;
}

export const PaymentCardSchema = SchemaFactory.createForClass(PaymentCard);
