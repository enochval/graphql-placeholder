import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { HttpModule } from '@nestjs/axios';
import { JsonplaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';

@Module({
  imports: [
    HttpModule,
    JsonplaceholderModule
  ],
  providers: [TodosService],
  exports: [TodosService]
})
export class TodosModule {}
