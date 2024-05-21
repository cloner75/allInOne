
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema({ versionKey: false })
export class Link {
  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  target: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: string;
  
  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);