import { Module, forwardRef } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JsonplaceholderModule } from 'src/common/services/jsonplaceholder/jsonplaceholder.module';
import { TodosResolver } from './todos.resolver';
import { UserModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    JsonplaceholderModule,
    forwardRef(() => UserModule)
  ],
  providers: [TodosService, TodosResolver],
  exports: [TodosService]
})
export class TodosModule {}
