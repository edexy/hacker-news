import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MyHttpService } from './http.service';
import { UtilsService } from './utils.service';

@Module({
  imports: [HttpModule],
  providers: [UtilsService, MyHttpService],
  exports: [UtilsService, MyHttpService],
})
export class UtilsModule {}
