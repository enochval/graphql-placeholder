import { Injectable } from '@nestjs/common';
import { Photo } from 'src/graphql';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';

@Injectable()
export class PhotosService {

    constructor(
        private readonly jsonplaceholdService: JsonplaceholderService<Photo>
    ){}

    async getPhotos(args: any): Promise<Photo[]> {
        const slashPhotoId: string = `${args.photoId ? '/'+args.photoId : ''}`
        const queryAlbumId: string = `${args.albumId ? '?albumId=' + args.albumId : ''}`
        const uri: string = `/photos${slashPhotoId}${queryAlbumId}`

        if (args.photoId) {
            args.isOne = true
        }

        return await this.jsonplaceholdService.handleGetRequest(uri, args)
    }
}
