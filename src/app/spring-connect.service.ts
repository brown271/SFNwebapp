import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpringConnectService {

  jwt = new BehaviorSubject<string>("");
  jwtObs = this.jwt.asObservable();


  updateJWT(newJWT){
    this.jwt.next(newJWT);
  }

  constructor(private http:HttpClient) { }

  testConnection(authHeader: HttpHeaders){
    console.log(authHeader)
    return this.http.get<String>('/api/test/conn',{headers:authHeader});
  }

  login(params){
    return this.http.post('/api/test/login',params,{observe:'response'})
  }

  getCalendar(){
    return this.http.get('/api/cal/');
  }
}
