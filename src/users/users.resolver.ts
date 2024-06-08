
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Album, Post, Todo, User } from "src/graphql";
import { UserService } from "./users.service";
import { PostsService } from "src/posts/posts.service";
import { AlbumsService } from "src/albums/albums.service";
import { TodosService } from "src/todos/todos.service";

@Resolver('User')
export class UsersResolver {

    constructor(
        private readonly userService: UserService,
        private readonly postsService: PostsService,
        private readonly albumService: AlbumsService,
        private readonly todoService: TodosService
    ){}

    @Query('users')
    async authors(@Args() args): Promise<User[]> {
        return await this.userService.getUsers(args)
    }

    @Query('userById')
    async author(@Args('id') id: number): Promise<User> {
        return await this.userService.getUserById(id)
    }

    @ResolveField('posts')
    async getPosts(@Parent() user, @Args() args): Promise<Post[]> {
        const { id } = user
        args.userId = id
        return await this.postsService.getPosts(args)
    }

    @ResolveField('albums')
    async getAlbums(@Parent() user, @Args() args): Promise<Album[]> {
        args.userId = user.id
        return await this.albumService.getAlbums(args);
    }

    @ResolveField('todos')
    async getTodos(@Parent() user, @Args() args): Promise<Todo[]> {
        const { id } = user
        return await this.todoService.getTodosByUserId(id, args)
    }
}