import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { EmailGroup } from 'src/assets/interfaces/emailGroup';
import { Role } from 'src/assets/interfaces/role';
import { SpecialFriend } from 'src/assets/interfaces/specialFriend';
import { ViewWillEnter } from '@ionic/angular';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {
  jwt:string;
  url:string;
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

  ionViewWillEnter(): void {
    this.refreshData()
  }
  ngOnInit() {
   this.refreshData()
  }
  constructor(private sConnect: SpringConnectService) {}

  refreshData(){
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
    this.sConnect.checkForJWTCookie();
  }
  

}
