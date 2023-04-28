import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DataService } from "./data.service";
@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, DataService],
})
export class AppModule {}
