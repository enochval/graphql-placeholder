import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UserModule } from 'src/users/users.module';
import { CommentsService } from './comments/comments.service';
import { CommentsResolver } from './comments/comments.resolver';
import { JsonplaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JsonplaceholderModule
  ],
  providers: [
    PostsService, 
    PostsResolver, 
    CommentsService, 
    CommentsResolver
  ],
  exports: [PostsService]
})
export class PostsModule {}
