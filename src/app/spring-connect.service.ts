import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

//
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

  saveJWTCookie(){
      let cookie = 'jwtcookie='+this.jwt.value+'; path=/'
      document.cookie = cookie; 
  }

  checkForJWTCookie(){
    var cookieList = document.cookie.split(';')
    for(var i = 0; i < cookieList.length; i++){
      var curCookie = cookieList[i]
      if(curCookie.indexOf("jwtcookie")==0){
        let jwtcookie = curCookie.substring(curCookie.indexOf("=")+1,curCookie.length);
        this.updateJWT(jwtcookie);
        this.checkIfJWTValid();
      }
    }
  }

  generateAuthHeader(){
    let authHeader = new HttpHeaders().set(
      'Authorization',  'Bearer ' + this.jwt.value);
    return authHeader;
  }

  checkIfJWTValid(){
  this.http.get("/api/test/",{headers:this.generateAuthHeader()}).subscribe(
    data =>{},
    error => {
      if(error.status == 403){
        this.updateJWT("");
      }
    }
   )
  }

  updateJWT(newJWT){
    this.jwt.next(newJWT);
    this.saveJWTCookie();
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
    return this.http.get(this.url + '/api/event/');
  }

  getSpecificCalendar(month:number, year:number){
    return this.http.get(this.url + '/api/event/' + month + '/' + year)
  }

  getEmailGroupByPage(page:number){
    let authHeader = this.generateAuthHeader()
    return this.http.get(this.url + '/api/email/page/' + page,{headers:this.generateAuthHeader()});
  }

  getSpecialFriendsByPage(page:number){
    return this.http.get(this.url + '/api/sf/page/' + page,{headers:this.generateAuthHeader()});
  }

  getAccountsByPage(page:number){
    return this.http.get(this.url + '/api/acc/page/' + page,{headers:this.generateAuthHeader()});
  }
 

  sendEmail(params){
    return this.http.post(this.url + '/api/email/sendEmail',params,{headers:this.generateAuthHeader()});
  }

  testPut(params){
    return this.http.put(this.url + '/api/group/update',params,{headers:this.generateAuthHeader()});
    
  }

  getAllRoles(){
    return this.http.get(this.url + '/api/role/',{headers:this.generateAuthHeader()});
  }

  deleteGroupById(id:number){
    return this.http.get(this.url + '/api/group/deleteById/' + id,{headers:this.generateAuthHeader()});
  }

  getPISearchInfo(search:string){
    return this.http.get(this.url + 
      '/api/pi/searchForPersonalInfo/' + search,{headers:this.generateAuthHeader()});
  }

  addGroup(params){
    return this.http.post(this.url + '/api/group/add', params,{headers:this.generateAuthHeader()})
  }

  getEditableRoles(){
    return this.http.get(this.url + '/api/role/editableRolesInSession',{headers:this.generateAuthHeader()})
  }


  addAdmin(params){
    return this.http.post(this.url + '/api/admin/',params,{headers:this.generateAuthHeader()})
  }
  updateAdmin(params){
    return this.http.put(this.url + '/api/admin/',params,{headers:this.generateAuthHeader()})
  }
  deleteAdminById(id){
    return this.http.get(this.url + '/api/admin/deleteById/' + id,{headers:this.generateAuthHeader()})
  }
  getAdminById(id){
    return this.http.get(this.url + '/api/admin/id/' + id,{headers:this.generateAuthHeader()})
  }


  addTeamMember(params){
    return this.http.post(this.url + '/api/tm/',params,{headers:this.generateAuthHeader()})
  }
  updateTeamMember(params){
    return this.http.put(this.url + '/api/tm/',params,{headers:this.generateAuthHeader()})
  }
  deleteTeamMemberById(id){
    return this.http.get(this.url + '/api/tm/deleteById/' + id,{headers:this.generateAuthHeader()})
  }
  getTeamMemberById(id){
    return this.http.get(this.url + '/api/tm/id/' + id,{headers:this.generateAuthHeader()})
  }


  addVolunteer(params){
    return this.http.post(this.url + '/api/volunteer/',params,{headers:this.generateAuthHeader()})
  }
  updateVolunteer(params){
    return this.http.put(this.url + '/api/volunteer/',params,{headers:this.generateAuthHeader()})
  }
  deleteVolunteerById(id){
    return this.http.get(this.url + '/api/volunteer/deleteById/' + id,{headers:this.generateAuthHeader()})
  }
  getVolunteerById(id){
    return this.http.get(this.url + '/api/volunteer/id/' + id,{headers:this.generateAuthHeader()})
  }


  addSpecialFriend(params){
    return this.http.post(this.url + '/api/sf/',params,{headers:this.generateAuthHeader()})
  }
  updateSpecialFriend(params){
    return this.http.put(this.url + '/api/sf/',params,{headers:this.generateAuthHeader()})
  }
  deleteSpecialFriendById(id){
    return this.http.get(this.url + '/api/sf/deleteById/' + id,{headers:this.generateAuthHeader()})
  }
  getSpecialFriendById(id){
    return this.http.get(this.url + '/api/sf/id/' + id,{headers:this.generateAuthHeader()})
  }

  addEvent(params){
    return this.http.post(this.url + 
      '/api/event/',params,{headers:this.generateAuthHeader()})
  }
  updateEvent(params){
    return this.http.put(this.url + '/api/event/',params,{headers:this.generateAuthHeader()})
  }
  deleteEventById(id){
    return this.http.get(this.url + '/api/event/deleteById/' + id,{headers:this.generateAuthHeader()})
  }
  getEventById(id){
    return this.http.get(this.url + '/api/event/findById/' + id,{headers:this.generateAuthHeader()})
  }

  findEventByName(name){
    return this.http.get(this.url + '/api/event/findByName/' + name,{headers:this.generateAuthHeader()})
  }

  logout(){
    return this.http.get(this.url + '/api/test/logout')
  }

  createApplication(params){
    return this.http.post(this.url + '/api/app/',params)
  }

  deleteApplicationById(id){
    return this.http.get(this.url + '/api/app/deleteById/' + id,{headers:this.generateAuthHeader()})
  }

  acceptApplicationById(id){
    return this.http.post(this.url + '/api/app/acceptById/' + id,{headers:this.generateAuthHeader()})
  }

  findApplicationById(id){
    return this.http.get(this.url + '/api/app/findById/' + id,{headers:this.generateAuthHeader()})
  }

  getAllApplications(){
    return this.http.get(this.url + '/api/app/')
  }

  

 

  

  

  


}
