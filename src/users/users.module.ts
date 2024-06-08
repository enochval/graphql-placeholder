import { Module, forwardRef } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { PostsModule } from 'src/posts/posts.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TodosModule } from 'src/todos/todos.module';

@Module({
    imports: [
        forwardRef(() => PostsModule),
        forwardRef(() => AlbumsModule),
        HttpModule, TodosModule],
    providers: [UsersResolver, UserService],
    exports: [UserService]
})
export class UserModule {}
