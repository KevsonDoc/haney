import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop()
  public title: string;

  @Prop()
  public description: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
