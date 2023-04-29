import { AppService } from "./app.service";
import { Controller, Query, Sse, Body, Post, Get } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from "./data.service";

import { DataDto } from "./dto/dataDto.dto";
import { MessageEventData } from "./models/messageEventData.model";
// import { MessageEvent, MessageEventData } from './message-event.interface';
// import { SseQueryDto } from './sse-query.dto';

interface MessageEvent {
  data: MessageEventData;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService
  ) {}

  // @Post('data')
  // postData(@Body() data: MessageEventData): { message: string; data: string } {
  //   this.dataService.setData(data);
  //   return {
  //     message: 'Data posted',
  //     data: data.value,
  //   };
  // }
  @Sse("sse")
  sse(@Query() sseQuery: SseQueryDto): Observable<MessageEvent> {
    const empresa = sseQuery.empresa;
    const user = sseQuery.user;
    const dataObservable = this.dataService.getObservable(empresa, user);

    // console.log("aaa", dataObservable);

    return dataObservable.pipe(
      map((data: MessageEventData): MessageEvent => ({ data }))
    );
  }

  @Post("data")
  setData(@Body() data: DataDto): { message: string; data: MessageEventData } {
    console.log("data", data);
    const messageData: MessageEventData = {
      value: data.value,
      empresa: data.empresa,
      userId: data.userId,
      crudId: data.crudId,
      type: data.type,
    };
    return this.dataService.setData(messageData);
  }

  @Get("allData")
  getAllData(): { message: string; data: any[] } {
    try {
      return this.dataService.getAllData();
    } catch (error) {
      console.log("error", error);
      return { message: "error", data: error };
    }
  }
}

interface SseQueryDto {
  empresa: string;
  user: string;
}
