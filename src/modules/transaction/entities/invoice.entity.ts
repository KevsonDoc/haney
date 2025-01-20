import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/modules/user/entities/profile.entity';
import { Category } from './category.entity';
import { PaymentCard } from './payment-card.entity';

export type UserDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public invoiceValue: number;

  @Prop({ default: false })
  public recurrence: boolean;

  @Prop({ default: null })
  public recurrenceCount: number | null;

  @Prop({ default: null })
  public invoiceDate: Date;

  @Prop({ required: true, default: Date.now })
  public createdAt: Date;

  @Prop({ default: null })
  public updatedAt: Date | null;

  @Prop({ default: null })
  public deletedAt: Date | null;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  })
  public category: [Category];

  @Prop({
    default: null,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentCard',
  })
  public paymentCard: PaymentCard | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  public profile: Profile;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
