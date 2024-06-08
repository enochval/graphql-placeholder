import { Injectable } from '@nestjs/common';
import { Album } from 'src/graphql';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';

@Injectable()
export class AlbumsService {

    constructor(
        private readonly jsonPlaceHolderService: JsonplaceholderService<Album>
    ) {}

    async getAlbums(args: any): Promise<Album[]> {
        const slashAlbumId: string = `${args.albumId ? '/' + args.albumId : ''}`
        const queryUserId: string = `${args.userId ? '?userId=' + args.userId : ''}`
        const uri: string = `/albums${slashAlbumId}${queryUserId}`

        if (args.albumId) {
            args.isOne = true
        }

        return await this.jsonPlaceHolderService.handleGetRequest(uri, args)
    }
}
