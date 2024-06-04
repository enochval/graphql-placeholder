import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TodosService],
  exports: [TodosService]
})
export class TodosModule {}
