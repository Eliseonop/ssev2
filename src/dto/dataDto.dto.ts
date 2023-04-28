/* eslint-disable prettier/prettier */
import { TypeData } from "src/models/typeData.enum";

export class DataDto {
  value: any
  empresa: string
  userId: string
  crudId: string
  type: TypeData
}
