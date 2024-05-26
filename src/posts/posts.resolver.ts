import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";

@Resolver('Post')
export class PostsResolver {

    constructor(private readonly postsService: PostsService){}

    @ResolveField('comments')
    async getPosts(@Parent() post): Promise<Comment[]> {
        const { id } = post
        return await this.postsService.getPostComments(id)
    }
}