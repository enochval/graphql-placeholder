import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { PostsModule } from 'src/posts/posts.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TodosModule } from 'src/todos/todos.module';

@Module({
    imports: [HttpModule, PostsModule, AlbumsModule, TodosModule],
    providers: [UsersResolver, UserService]
})
export class AuthorModule {}
