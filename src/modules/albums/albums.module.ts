import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { PhotosService } from './photos/photos.service';
import { AlbumResolver } from './albums.resolver';
import { UserModule } from 'src/modules/users/users.module';
import { JsonplaceholderModule } from 'src/common/services/jsonplaceholder/jsonplaceholder.module';
import { PhotosResolver } from './photos/photos.resolver';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JsonplaceholderModule
    ],
    providers: [AlbumsService, AlbumResolver, PhotosService, PhotosResolver],
    exports: [AlbumsService, PhotosService]
})
export class AlbumsModule {}
