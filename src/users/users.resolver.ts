
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Comment, Post, User } from "src/graphql";
import { AuthorService } from "./users.service";
import { PostsService } from "src/posts/posts.service";

@Resolver('User')
export class AuthorsResolver {

    constructor(
        private readonly authorService: AuthorService,
        private readonly postsService: PostsService
    ){}

    @Query('users')
    async authors(): Promise<User[]> {
        return await this.authorService.getAuthors()
    }

    @Query('user')
    async author(@Args('id') id: number): Promise<User> {
        return await this.authorService.getAuthor(id)
    }

    @ResolveField('posts')
    async getPosts(@Parent() author): Promise<Post[]> {
        const { id } = author
        return await this.postsService.getAuthorPosts(id)
    }
}