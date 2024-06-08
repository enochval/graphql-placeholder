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

    async getPhotosByAlbumId(albumId: number, args: any): Promise<Photo[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<any[]>(`${this.baseUrl}/photos`).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )

        const photos: Photo[] = data.filter(o => o.albumId === albumId)

        if (args.first) {
            const length = (args.first > photos.length) ? photos.length : args.first
            return photos.slice(0, length)
        }

        return photos;
    }
}
