import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Album, Photo } from "src/graphql";
import { AlbumsService } from "../albums.service";
import { PhotosService } from "./photos.service";


@Resolver('Photo')
export class PhotosResolver {

    constructor(
        private readonly albumService: AlbumsService,
        private readonly photosService: PhotosService
    ) {}

    @Query('photos')
    async getPhotos(@Args() args): Promise<Photo[]> {
        return await this.photosService.getPhotos(args)
    }

    @ResolveField('album')
    async getPhotoAlbum(@Parent() photo): Promise<Album> {
        const args: any = { albumId: photo.albumId }
        const rsp = await this.albumService.getAlbums(args)
        return rsp.find(() => true)
    }
}