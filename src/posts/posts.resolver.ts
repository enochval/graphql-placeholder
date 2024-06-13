import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { Post, User, Comment } from "src/graphql";
import { UserService } from "src/users/users.service";
import { CommentsService } from "./comments/comments.service";
import { CreatePostDTO } from "./dto/create-post.dto";

@Resolver('Post')
export class PostsResolver {

    constructor(
        private readonly postsService: PostsService,
        private readonly userService: UserService,
        private readonly commentsService: CommentsService
    ) { }

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

    @Mutation()
    async createPost(@Args('post') post: CreatePostDTO): Promise<Post> {
        return this.postsService.createPost(post)
    }

    @Mutation()
    async updatePost(
        @Args('postId') postId: number, 
        @Args('post') post: Partial<CreatePostDTO>): Promise<Post> {
        return this.postsService.updatePost(postId, post)
    }

    @Mutation()
    async deletePost(@Args('postId') postId: number): Promise<string> {
        return await this.postsService.deletePost(postId)
    }
}