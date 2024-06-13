import { Injectable } from '@nestjs/common';
import { Post } from 'src/graphql';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';
import { CreatePostDTO } from './dto/create-post.dto';

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

    async createPost(post: CreatePostDTO): Promise<Post> {
        return await this.jsonplaceholderService.handlePostRequest<CreatePostDTO>(
            '/posts', post
        )
    }

    async updatePost(id: number, post: Partial<CreatePostDTO>): Promise<Post> {
        return await this.jsonplaceholderService.handlePatchRequest<Partial<CreatePostDTO>>(
            `/posts/${id}`, post
        )
    }

    async deletePost(id: number): Promise<string> {
        await this.jsonplaceholderService.handleDeleteRequest(
            `/posts/${id}`
        )
        return `Post with ID ${id} is successfully deleted.`
    }
}
