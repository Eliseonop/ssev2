/* eslint-disable prettier/prettier */
import { TypeData } from './typeData.enum'

export interface MessageEventData {
  value: string
  empresa: string
  userId: string
  crudId: string
  type: TypeData
}
