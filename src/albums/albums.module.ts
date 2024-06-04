import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { HttpModule } from '@nestjs/axios';
import { PhotosService } from './photos/photos.service';
import { AlbumResolver } from './albums.resolver';

@Module({
    imports: [HttpModule],
    providers: [AlbumsService, AlbumResolver, PhotosService],
    exports: [AlbumsService, PhotosService]
})
export class AlbumsModule {}
