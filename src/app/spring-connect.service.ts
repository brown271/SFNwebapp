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
}
