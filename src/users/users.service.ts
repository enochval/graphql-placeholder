import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from 'src/graphql';

@Injectable()
export class AuthorService {
    private readonly logger: Logger = new Logger(AuthorService.name)
    private readonly baseUrl: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async getAuthors(): Promise<User[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<User[]>(`${this.baseUrl}/users`).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data)
                    throw new BadRequestException('An error happened!')
                })
            )
        )
        return data
    }

    async getAuthor(id: number): Promise<User> {
        const { data } = await firstValueFrom(
            this.httpService.get<User>(`${this.baseUrl}/users/${id}`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happended!")
                })
            )
        )
        return data
    }
}
