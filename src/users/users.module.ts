import { Module } from '@nestjs/common';
import { AuthorsResolver } from './users.resolver';
import { AuthorService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { PostsModule } from 'src/posts/posts.module';

@Module({
    imports: [HttpModule, PostsModule],
    providers: [AuthorsResolver, AuthorService]
})
export class AuthorModule {}
