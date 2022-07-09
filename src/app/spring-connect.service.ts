import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpringConnectService {

  constructor(private http:HttpClient) { }

  testConnection(){
    return this.http.get<String>('/api/test/conn');
  }

  login(params){
    return this.http.post('/api/test/login',params)
  }
}
