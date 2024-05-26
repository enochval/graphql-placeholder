import { Module } from '@nestjs/common';
import { AuthorsResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { HttpModule } from '@nestjs/axios';
import { PostsModule } from 'src/posts/posts.module';

@Module({
    imports: [HttpModule, PostsModule],
    providers: [AuthorsResolver, AuthorService]
})
export class AuthorModule {}
