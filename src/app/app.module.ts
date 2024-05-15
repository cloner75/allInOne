import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TodoModule } from '../todo/todo.module';
import { ShorterModule } from '../shorter/shorter.module';
import { TicketingModule } from '../ticketing/ticketing.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongodbConfig from 'configs/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas/user.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.test', '.env.production'],
      load: [mongodbConfig],
      isGlobal: true
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    TodoModule,
    ShorterModule,
    TicketingModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
