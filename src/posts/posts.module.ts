import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [HttpModule],
  providers: [PostsService, PostsResolver],
  exports: [PostsService]
})
export class PostsModule {}
