import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Post } from 'src/graphql';

@Injectable()
export class PostsService {
    private readonly logger: Logger = new Logger(PostsService.name)
    private readonly baseUrl: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async getPosts(args: any): Promise<Post[]> {
        const slashPostId = `${args.commentId ? '/'+args.commentId : ''}`
        const queryUserId = `${args.userId ? '?userId=' + args.userId : ''}`
        const uri = `${this.baseUrl}/posts${slashPostId}${queryUserId}`

        const { data } = await firstValueFrom(
            this.httpService.get<any|Post[]>(uri).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )

        if (args.postId) {
            const posts: Array<Post> = []
            posts.push(data)
            return posts
        }

        let rsp: Array<any> = data

        if (args.first) {
            rsp = rsp.slice(0, args.first)
        }

        return rsp
    }

    async getPost(id: number): Promise<Post> {
        const { data } = await firstValueFrom(
            this.httpService.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        return data
    }

    async getUserPosts(userId: number, args: any): Promise<Post[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any[]>(`${this.baseUrl}/posts`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        const userPosts = data.filter(a => a.userId === userId)

        if (args.first) {
            return userPosts.slice(0, args.first)
        }

        return userPosts
    }

    async getPostComments(postId: number, args: any): Promise<Comment[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Comment[]>(`${this.baseUrl}/post/${postId}/comments`)
            .pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )

        if (args.first) {
            return data.slice(0, args.first)
        }

        return data
    }
}
