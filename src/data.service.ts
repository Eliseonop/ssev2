/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";
import { MessageEventData } from "./models/messageEventData.model";
import { EmpresaObservable } from "./models/empresaObservable.type";

@Injectable()
export class DataService {
  private mapSubjects = new Map<string, EmpresaObservable>();

  getObservable(
    empresa: string,
    user: string
  ): BehaviorSubject<MessageEventData> {
    const dataSubject = this.mapSubjects.get(empresa);
    // console.log('dataSubject 21', dataSubject)
    if (dataSubject) {
      if (!dataSubject.user.includes(user)) {
        dataSubject.user.push(user);
      }
      // console.log('dataSubject 27', dataSubject.observable)
      return dataSubject.observable;
    }

    const newDataSubject = new BehaviorSubject<MessageEventData>(null);
    const newEmpresaObservable = {
      observable: newDataSubject,
      user: [user],
    };
    this.mapSubjects.set(empresa, newEmpresaObservable);
    // console.log('add dataSubject', dataSubject)
    // console.log('soy toods', this.mapSubjects)
    return newDataSubject;
  }

  /**
   *  Con este metodo se envia la data a los observables
   * @param data
   * @returns
   */
  setData(data: MessageEventData): { message: string; data: MessageEventData } {
    const empresa = data.empresa;
    // console.log('empresa', empresa)
    if (!empresa) {
      // console.log('empresa is null')
      return { message: "falta empresa", data: data };
    }
    const dataSubject = this.mapSubjects.get(empresa);

    if (dataSubject) {
      dataSubject.observable.next(data);
      dataSubject.observable.next(null);
      return { message: "Data posted", data: data };
    } else {
      console.log("dataSubject is null");
      return { message: "No esta registrada esa empresa", data: data };
    }
  }

  getAllData(): { message: string; data: any[] } {
    const empresaObservableList: any[] = [];

    // Iterar a través del mapSubjects
    this.mapSubjects.forEach((value: EmpresaObservable, key: string) => {
      // Crear un objeto JSON para cada elemento del mapSubjects
      const empresaObservableJson = {
        empresa: key,
        // observable: value.observable,
        user: value.user,
        // messageEventData: {
        //   value: value.observable.value.value,
        //   empresa: key,
        //   userId: value.observable.value.userId,
        //   crudId: value.observable.value.crudId,
        //   type: value.observable.value.type
        // }
      };
      // Agregar el objeto JSON al array empresaObservableList
      empresaObservableList.push(empresaObservableJson);
    });

    return { message: "allData RealTime", data: empresaObservableList };
  }
}
