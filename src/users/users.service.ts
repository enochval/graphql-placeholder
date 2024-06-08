import { Injectable } from '@nestjs/common';
import { User } from 'src/graphql';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';

@Injectable()
export class UserService {

    constructor(
        private readonly jsonplaceholderService: JsonplaceholderService<User>
    ) {}

    async getUsers(args: any): Promise<User[]> {
        const slashUserId: string = `${args.userId ? '/'+args.userId : ''}`
        const uri: string = `/users${slashUserId}`

        if (args.userId) {
            args.isOne = true
        }
        return await this.jsonplaceholderService.handleGetRequest(uri, args)
    }

    async getUserById(id: number): Promise<User> {
        const uri: string = `/users/${id}`
        return await this.jsonplaceholderService.handleGetRequest(uri)
    }
}
