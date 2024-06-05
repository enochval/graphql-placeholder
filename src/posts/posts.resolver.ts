import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { Post, User } from "src/graphql";
import { UserService } from "src/users/users.service";

@Resolver('Post')
export class PostsResolver {

    constructor(
        private readonly postsService: PostsService,
        private readonly userService: UserService
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
        const { id } = post
        return await this.postsService.getPostComments(id, args)
    }
}