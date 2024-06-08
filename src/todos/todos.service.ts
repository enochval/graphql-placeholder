import { Injectable } from '@nestjs/common';
import { Todo } from 'src/graphql';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';

@Injectable()
export class TodosService {

    constructor(
        private readonly jsonplaceholderService: JsonplaceholderService<Todo>
    ) {}

    async getTodos(args: any): Promise<Todo[]> {
        const slashTodoId: string = `${args.todoId ? '/' + args.todoId : ''}`
        const queryUserId: string = `${args.userId ? '?userId=' + args.userId : ''}`
        const uri: string = `/todos${slashTodoId}${queryUserId}`
        
        if (args.todoId) {
            args.isOne = true
        }

        return await this.jsonplaceholderService.handleGetRequest(uri, args)
    }
}
