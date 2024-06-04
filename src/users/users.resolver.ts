
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Post, User } from "src/graphql";
import { UserService } from "./users.service";
import { PostsService } from "src/posts/posts.service";
import { AlbumsService } from "src/albums/albums.service";

@Resolver('User')
export class UsersResolver {

    constructor(
        private readonly userService: UserService,
        private readonly postsService: PostsService,
        private readonly albumService: AlbumsService
    ){}

    @Query('users')
    async authors(): Promise<User[]> {
        return await this.userService.getUsers()
    }

    @Query('user')
    async author(@Args('id') id: number): Promise<User> {
        return await this.userService.getUserById(id)
    }

    @ResolveField('posts')
    async getPosts(@Parent() user): Promise<Post[]> {
        const { id } = user
        return await this.postsService.getUserPosts(id)
    }

    @ResolveField('albums')
    async getAlbums(@Parent() user) {
        const { id } = user
        return await this.albumService.getUserAlbums(id);
    }
}