import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
