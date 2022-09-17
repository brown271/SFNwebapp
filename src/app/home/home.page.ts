import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { EmailGroup } from 'src/assets/interfaces/emailGroup';
import { Role } from 'src/assets/interfaces/role';
import { SpecialFriend } from 'src/assets/interfaces/specialFriend';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  jwt:string;
  role: Role = {
    id:1
  }
  roles: Role[] = [this.role]
  sf: SpecialFriend = {
    id:1,
    
  }
  sfs: SpecialFriend[] = [this.sf]
  eg: EmailGroup = {
    id:0,
description:"NOT DEFAULT DESCRIPTION",
name:"DEFAULT NAME",
roles:this.roles,
SFNAccounts:null,
specialFriends:this.sfs,
  }
  ngOnInit() {
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
  }
  constructor(private sConnect: SpringConnectService) {}

  
  testConn(){
    let authHeader = new HttpHeaders().set('Authorization',  'Bearer ' + this.jwt);
    this.sConnect.testConnection(authHeader).subscribe(
      (data:String) => console.log(data),
      error => console.log(error)
    )
  }

  test(){
    //able to send a Group with the id's of all the people within,
    //realistically speaking this allows for editing of groups
    //description and name also go through aswell
    //good job king!
    this.sConnect.testPut(this.eg).subscribe(
      (data:any) => console.log(data),
      error => console.log(error)
    )
  }
}
