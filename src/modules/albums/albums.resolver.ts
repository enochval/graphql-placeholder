import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PhotosService } from "./photos/photos.service";
import { Album, Photo, User } from "src/graphql";
import { AlbumsService } from "./albums.service";
import { UserService } from "src/modules/users/users.service";

@Resolver('Album')
export class AlbumResolver {

    constructor(
        private readonly photosService: PhotosService,
        private readonly albumsService: AlbumsService,
        private readonly userService: UserService
    ) {}

    @Query('albums')
    async getAlbums(@Args() args): Promise<Album[]> {
        return await this.albumsService.getAlbums(args)
    }

    @ResolveField('photos')
    async getAlbumPhotos(@Parent() album, @Args() args): Promise<Photo[]> {
        args.albumId = album.id
        return await this.photosService.getPhotos(args)
    }

    @ResolveField('user')
    async getAlbumUser(@Parent() album): Promise<User> {
        return await this.userService.getUserById(album.userId)
    }
}