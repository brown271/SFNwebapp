import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventserviceService {

  eventFormData = new BehaviorSubject<any>({
    address:'',
    date:'',
    description:'',
    host:'',
    id:null,
    isOnline:true,
    linkToEvent:'',
    name:'',
    time:'',
  });
  eventFormDataObserver = this.eventFormData.asObservable();

  constructor() { }

  updateEventFormData(eventFormData){
    this.eventFormData.next(eventFormData)
  }

  makeNewEmptyForm(){
    this.eventFormData.next({
      address:'',
      date:'',
      description:'',
      host:'',
      id:null,
      isOnline:true,
      linkToEvent:'',
      name:'',
      time:'',
    })
  }
}
