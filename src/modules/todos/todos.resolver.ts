import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TodosService } from "./todos.service";
import { Todo, User } from "src/graphql";
import { UserService } from "src/modules/users/users.service";


@Resolver('Todo')
export class TodosResolver {

    constructor(
        private readonly todosService: TodosService,
        private readonly usersService: UserService
    ) {}

    @Query('todos')
    async getTodos(@Args() args): Promise<Todo[]> {
        return await this.todosService.getTodos(args)
    }

    @ResolveField('user')
    async getTodoUser(@Parent() todo): Promise<User> {
        return await this.usersService.getUserById(todo.userId)
    }
}