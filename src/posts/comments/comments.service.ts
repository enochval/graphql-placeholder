import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Comment } from 'src/graphql';

@Injectable()
export class CommentsService {
    private readonly logger: Logger = new Logger(CommentsService.name)
    private baseUrl: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async getComments(args: any): Promise<Comment[]> {
        const slashCommentId = `${args.commentId ? '/'+args.commentId : ''}`
        const queryPostId = `${args.postId ? '?postId=' + args.postId : ''}`
        const uri = `${this.baseUrl}/comments${slashCommentId}${queryPostId}`

        const { data } = await firstValueFrom(
            this.httpService.get<any|Comment[]>(uri).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )

        if (args.commentId) {
            const res: Array<Comment> = []
            res.push(data)
            return res
        }

        let rsp: Array<Comment> = data

        if (args.first) {
            const length = (args.first > rsp.length) ? rsp.length : args.first
            rsp = rsp.slice(0, length)
        }
 
        return rsp
    }
}
