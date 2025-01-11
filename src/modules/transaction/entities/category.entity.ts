import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  public title: string;

  @Prop({ required: true, default: Date.now })
  public createdAt: Date;

  @Prop({ default: null })
  public updatedAt: Date | null;

  @Prop({ default: null })
  public deletedAt: Date | null;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
