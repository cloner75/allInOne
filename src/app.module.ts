import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ShorterModule } from './shorter/shorter.module';
import { TicketingModule } from './ticketing/ticketing.module';

@Module({
  imports: [TodoModule, ShorterModule, TicketingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
