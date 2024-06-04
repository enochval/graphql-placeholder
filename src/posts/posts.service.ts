import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
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

    async getPosts(): Promise<Post[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Post[]>(`${this.baseUrl}/posts`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        return data
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

    async getUserPosts(userId: number): Promise<Post[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any[]>(`${this.baseUrl}/posts`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        return data.filter(a => a.userId === userId)
    }

    async getPostComments(postId: number): Promise<Comment[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Comment[]>(`${this.baseUrl}/post/${postId}/comments`)
            .pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        return data
    }
}
