import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CommentsService } from "./comments.service";
import { Comment, Post } from "src/graphql";
import { PostsService } from "../posts.service";

@Resolver('Comment')
export class CommentsResolver {

    constructor(
        private readonly commentsService: CommentsService,
        private readonly postsService: PostsService
    ) {}

    @Query('comments')
    async getComments(@Args() args: any): Promise<Comment[]> {
        return await this.commentsService.getComments(args)
    }

    @ResolveField('post')
    async getCommentPost(@Parent() comment): Promise<Post> {
        return await this.postsService.getPostById(comment.postId)
    }
}