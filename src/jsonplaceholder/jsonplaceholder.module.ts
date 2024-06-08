import { Module } from '@nestjs/common';
import { JsonplaceholderService } from './jsonplaceholder.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JsonplaceholderService],
  exports: [JsonplaceholderService]
})
export class JsonplaceholderModule {}
