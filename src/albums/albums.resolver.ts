import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PhotosService } from "./photos/photos.service";
import { Photo } from "src/graphql";

@Resolver('Album')
export class AlbumResolver {

    constructor(private readonly photosService: PhotosService) {}

    @ResolveField('photos')
    async getAlbumPhotos(@Parent() album, @Args() args): Promise<Photo[]> {
        const { id } = album
        return await this.photosService.getPhotosByAlbumId(id, args)
    }

}