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

    async getAlbums(args: any): Promise<Album[]> {
        const slashAlbumId = `${args.albumId ? '/' + args.albumId : ''}`
        const queryUserId = `${args.userId ? '?userId=' + args.userId : ''}`
        const uri = `${this.baseUrl}/albums${slashAlbumId}${queryUserId}`

        const { data } = await firstValueFrom(
            this.httpService.get<any|Album[]>(uri)
                .pipe(
                    catchError((err: AxiosError) => {
                        this.logger.error(err.response.data)
                        throw new BadRequestException('An error happened!')
                    })
                )
        )

        if(args.albumId) {
            const album: Array<Album> = []
            album.push(data)
            return album
        }

        let rsp: Array<any> = data
        if (args.first) {
            const length = (args.first > rsp.length) ? rsp.length : args.first
            rsp = rsp.slice(0, length)
        }

        return rsp
    }
}
