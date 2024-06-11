import { Module, forwardRef } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';
import { PostsModule } from 'src/posts/posts.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TodosModule } from 'src/todos/todos.module';
import { JsonplaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';

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
