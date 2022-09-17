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

  getSpecificCalendar(month:number, year:number){
    return this.http.get('/api/cal/' + month + '/' + year)
  }

  getEmailGroupByPage(page:number){
    return this.http.get('/api/email/page/' + page);
  }

  getSpecialFriendsByPage(page:number){
    return this.http.get('/api/sf/page/' + page);
  }

  getAccountsByPage(page:number){
    return this.http.get('/api/acc/page/' + page);
  }

  sendEmail(params){
    return this.http.post('/api/email/sendEmail',params);
  }

  testPut(params){
    return this.http.put('/api/group/update',params);
    
  }

  getAllRoles(){
    return this.http.get('/api/role/');
  }

  deleteUserById(id:number){
    return this.http.get('/api/group/deleteById/' + id);
  }

  getPISearchInfo(search:string){
    return this.http.get('/api/pi/searchForPersonalInfo/' + search);
  }


}
