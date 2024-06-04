import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Todo } from 'src/graphql';

@Injectable()
export class TodosService {
    private readonly baseUrl: string
    private readonly logger: Logger = new Logger(TodosService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async getTodosByUserId(userId: number): Promise<Todo[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any[]>(`${this.baseUrl}/todos`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        return data.filter(o => o.userId === userId)
    }
}
