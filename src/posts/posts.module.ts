import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { PostsResolver } from './posts.resolver';
import { UserModule } from 'src/users/users.module';
import { CommentsService } from './comments/comments.service';
import { CommentsResolver } from './comments/comments.resolver';

@Module({
  imports: [HttpModule, forwardRef(() => UserModule)],
  providers: [PostsService, PostsResolver, CommentsService, CommentsResolver],
  exports: [PostsService]
})
export class PostsModule {}
