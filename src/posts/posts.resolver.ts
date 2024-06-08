import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { Post, User, Comment } from "src/graphql";
import { UserService } from "src/users/users.service";
import { CommentsService } from "./comments/comments.service";

@Resolver('Post')
export class PostsResolver {

    constructor(
        private readonly postsService: PostsService,
        private readonly userService: UserService,
        private readonly commentsService: CommentsService
    ){}

    @Query('posts')
    async getPosts(@Args() args: any): Promise<Post[]> {
        return await this.postsService.getPosts(args)
    }

    @ResolveField('user')
    async getPostUser(@Parent() post): Promise<User> {
        return await this.userService.getUserById(post.userId)
    }

    @ResolveField('comments')
    async getPostComments(@Parent() post, @Args() args): Promise<Comment[]> {
        return await this.commentsService.getPostComments(post.id, args)
    }
}