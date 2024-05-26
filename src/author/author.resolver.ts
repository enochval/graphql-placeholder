
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Author, Post } from "src/graphql";
import { AuthorService } from "./author.service";
import { PostsService } from "src/posts/posts.service";

@Resolver('Author')
export class AuthorsResolver {

    constructor(
        private readonly authorService: AuthorService,
        private readonly postsService: PostsService
    ){}

    @Query('authors')
    async authors(): Promise<Author[]> {
        return await this.authorService.getAuthors()
    }

    @Query('author')
    async author(@Args('id') id: number): Promise<Author> {
        return await this.authorService.getAuthor(id)
    }

    @ResolveField('posts')
    async getPosts(@Parent() author): Promise<Post[]> {
        const { id } = author
        return await this.postsService.getAuthorPosts(id)
    }
}