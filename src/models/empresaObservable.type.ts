/* eslint-disable prettier/prettier */
import { BehaviorSubject } from "rxjs";
import { MessageEventData } from './messageEventData.model'

export interface EmpresaObservable {
  observable: BehaviorSubject<MessageEventData>
  user: string[]
}
