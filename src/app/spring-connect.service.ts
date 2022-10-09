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
  formData = new BehaviorSubject<any>([]);
  formDataObserver = this.formData.asObservable();

  updateFormData(formData){
    this.formData.next(formData)
  }

  testTest(authHeader: HttpHeaders){
    return this.http.get("/api/test/",{headers:authHeader});
  }

  updateJWT(newJWT){
    this.jwt.next(newJWT);
  }

  constructor(private http:HttpClient) { }

  testGet(){
   return  this.http.get(this.url + "/api/test/")
  }

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

  deleteGroupById(id:number){
    return this.http.get(this.url + '/api/group/deleteById/' + id);
  }

  getPISearchInfo(search:string){
    return this.http.get(this.url + 
      '/api/pi/searchForPersonalInfo/' + search);
  }

  addGroup(params){
    return this.http.post(this.url + '/api/group/add', params)
  }

  getEditableRoles(authHeader: HttpHeaders){
    return this.http.get(this.url + '/api/role/editableRolesInSession',{headers:authHeader})
  }


  addAdmin(params){
    return this.http.post(this.url + '/api/admin/',params)
  }
  updateAdmin(params){
    return this.http.put(this.url + '/api/admin/',params)
  }
  deleteAdminById(id){
    return this.http.get(this.url + '/api/admin/deleteById/' + id)
  }
  getAdminById(id){
    return this.http.get(this.url + '/api/admin/id/' + id)
  }


  addTeamMember(params){
    return this.http.post(this.url + '/api/tm/',params)
  }
  updateTeamMember(params){
    return this.http.put(this.url + '/api/tm/',params)
  }
  deleteTeamMemberById(id){
    return this.http.get(this.url + '/api/tm/deleteById/' + id)
  }
  getTeamMemberById(id){
    return this.http.get(this.url + '/api/tm/id/' + id)
  }


  addVolunteer(params){
    return this.http.post(this.url + '/api/volunteer/',params)
  }
  updateVolunteer(params){
    return this.http.put(this.url + '/api/volunteer/',params)
  }
  deleteVolunteerById(id){
    return this.http.get(this.url + '/api/volunteer/deleteById/' + id)
  }
  getVolunteerById(id){
    return this.http.get(this.url + '/api/volunteer/id/' + id)
  }


  addSpecialFriend(params){
    return this.http.post(this.url + '/api/sf/',params)
  }
  updateSpecialFriend(params){
    return this.http.put(this.url + '/api/sf/',params)
  }
  deleteSpecialFriendById(id){
    return this.http.get(this.url + '/api/sf/deleteById/' + id)
  }
  getSpecialFriendById(id){
    return this.http.get(this.url + '/api/sf/id/' + id)
  }

 

  

  

  


}
