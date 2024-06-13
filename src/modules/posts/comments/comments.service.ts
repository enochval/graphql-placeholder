import { Injectable } from '@nestjs/common';
import { Comment } from 'src/graphql';
import { JsonplaceholderService } from 'src/common/services/jsonplaceholder/jsonplaceholder.service';

@Injectable()
export class CommentsService {

    constructor(
        private readonly jsonplaceholderService: JsonplaceholderService<Comment>
    ){}

    async getComments(args: any): Promise<Comment[]> {
        const slashCommentId: string = `${args.commentId ? '/'+args.commentId : ''}`
        const queryPostId: string = `${args.postId ? '?postId=' + args.postId : ''}`
        const uri: string = `/comments${slashCommentId}${queryPostId}`

        if (args.commentId) {
            args.isOne = true
        }

        return this.jsonplaceholderService.handleGetRequest(uri, args)
    }

    async getPostComments(postId: number, args: any): Promise<Comment[]> {
        const uri: string = `/post/${postId}/comments`
        return await this.jsonplaceholderService.handleGetRequest(uri, args)
    }
}
