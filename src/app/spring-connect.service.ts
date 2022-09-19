import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpringConnectService {

  jwt = new BehaviorSubject<string>("");
  jwtObs = this.jwt.asObservable();
  url = ""


  updateJWT(newJWT){
    this.jwt.next(newJWT);
  }

  constructor(private http:HttpClient) { }

  testConnection(authHeader: HttpHeaders){
    console.log(authHeader)
    return this.http.get<String>(this.url + '/api/test/conn',{headers:authHeader});
  }

  login(params){
    return this.http.post(this.url + '/api/test/login',params,{observe:'response'})
  }

  getCalendar(){
    return this.http.get(this.url + '/api/cal/');
  }

  getSpecificCalendar(month:number, year:number){
    return this.http.get(this.url + '/api/cal/' + month + '/' + year)
  }

  getEmailGroupByPage(page:number){
    return this.http.get(this.url + '/api/email/page/' + page);
  }

  getSpecialFriendsByPage(page:number){
    return this.http.get(this.url + '/api/sf/page/' + page);
  }

  getAccountsByPage(page:number){
    return this.http.get(this.url + '/api/acc/page/' + page);
  }

  sendEmail(params){
    return this.http.post(this.url + '/api/email/sendEmail',params);
  }

  testPut(params){
    return this.http.put(this.url + '/api/group/update',params);
    
  }

  getAllRoles(){
    return this.http.get(this.url + '/api/role/');
  }

  deleteUserById(id:number){
    return this.http.get(this.url + '/api/group/deleteById/' + id);
  }

  getPISearchInfo(search:string){
    return this.http.get(this.url + '/api/pi/searchForPersonalInfo/' + search);
  }

  addGroup(params){
    return this.http.post(this.url + '/api/group/add', params)
  }


}
