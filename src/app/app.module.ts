import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TodoModule } from '../todo/todo.module';
import { ShorterModule } from '../shorter/shorter.module';
import { TicketingModule } from '../ticketing/ticketing.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas/user.schema';
import mongodbConfig from 'configs/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [mongodbConfig],
      isGlobal: true
    }),
    TodoModule,
    ShorterModule,
    TicketingModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGO_URL')
        };
      },
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
