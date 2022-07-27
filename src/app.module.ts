import { Module } from "@nestjs/common";
import { UtilsModule } from "utils/utils.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
