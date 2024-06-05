import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Album } from 'src/graphql';

@Injectable()
export class AlbumsService {
    private readonly baseUrl: string
    private readonly logger: Logger = new Logger(AlbumsService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async getUserAlbums(id: number, args: any): Promise<Album[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any[]>(`${this.baseUrl}/albums`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        const userAlbums = data.filter(o => o.userId === id)

        if (args.first) {
            return userAlbums.slice(0, args.first)
        }

        return userAlbums;
    }
}
