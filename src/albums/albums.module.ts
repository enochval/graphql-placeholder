import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { HttpModule } from '@nestjs/axios';
import { PhotosService } from './photos/photos.service';
import { AlbumResolver } from './albums.resolver';
import { UserModule } from 'src/users/users.module';

@Module({
    imports: [
        forwardRef(() => UserModule),
        HttpModule
    ],
    providers: [AlbumsService, AlbumResolver, PhotosService],
    exports: [AlbumsService, PhotosService]
})
export class AlbumsModule {}
