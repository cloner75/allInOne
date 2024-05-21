import { Module } from '@nestjs/common';
import { ShorterService } from './services/shorter.service';
import { ShorterController } from './controllers/shorter.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from 'schemas/link.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeatureAsync([
      {
        name: Link.name,
        useFactory: () => {
          const schema = LinkSchema;
          schema.pre('save', function () {
            console.log('Hello from pre save');
          });
          return schema;
        }
      }
    ]),
  ],
  controllers: [ShorterController],
  providers: [ShorterService],
})
export class ShorterModule { }
