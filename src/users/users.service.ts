import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from 'src/graphql';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name)
    private readonly baseUrl: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async getUsers(args: any): Promise<User[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any|User[]>(`${this.baseUrl}/users/${args.userId ? args.userId : ''}`).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data)
                    throw new BadRequestException('An error happened!')
                })
            )
        )

        if (args.first && Array.isArray(data)) {
            return data.slice(0, args.first)
        }

        if (args.userId) {
            const user: Array<User> = []
            user.push(data)
            return user
        }

        return data
    }

    async getUserById(id: number): Promise<User> {
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
