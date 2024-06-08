import { Injectable } from '@nestjs/common';
import { Post } from 'src/graphql';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';

@Injectable()
export class PostsService {

    constructor(
        private readonly jsonplaceholderService: JsonplaceholderService<Post>
    ){}

    async getPosts(args: any): Promise<Post[]> {
        const slashPostId: string = `${args.postId ? '/'+args.postId : ''}`
        const queryUserId: string = `${args.userId ? '?userId=' + args.userId : ''}`
        const uri: string = `/posts${slashPostId}${queryUserId}`

        if (args.postId) {
            args.isOne = true
        }

        return this.jsonplaceholderService.handleGetRequest(uri, args)
    }

    async getPostById(id: number): Promise<Post> {
        const uri: string = `/posts/${id}`
        return await this.jsonplaceholderService.handleGetRequest(uri)
    }
}
