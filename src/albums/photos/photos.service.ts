import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Photo } from 'src/graphql';

@Injectable()
export class PhotosService {
    private readonly logger: Logger = new Logger(PhotosService.name)
    private readonly baseUrl: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async getPhotosByAlbumId(albumId: number): Promise<Photo[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any[]>(`${this.baseUrl}/photos`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )

        return data.filter(o => o.albumId === albumId)
    }
}
