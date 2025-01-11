import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/modules/user/entities/profile.entity';
import { Category } from './category.entity';

export type UserDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public invoiceValue: number;

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
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  })
  public profile: Profile;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
