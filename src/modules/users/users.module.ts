import { Module, forwardRef } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';
import { PostsModule } from 'src/modules/posts/posts.module';
import { AlbumsModule } from 'src/modules/albums/albums.module';
import { TodosModule } from 'src/modules/todos/todos.module';
import { JsonplaceholderModule } from 'src/common/services/jsonplaceholder/jsonplaceholder.module';

@Module({
    imports: [
        forwardRef(() => PostsModule),
        forwardRef(() => AlbumsModule),
        forwardRef(() => TodosModule),
        JsonplaceholderModule
    ],
    providers: [UsersResolver, UserService],
    exports: [UserService]
})
export class UserModule {}
