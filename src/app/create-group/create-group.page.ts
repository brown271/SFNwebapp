import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  bannerInfo:string;
  jwt:string;
  sfPage:number = 0;
  accPage:number = 0;
  sfMax:number = 100000;
  accMax:number = 100000;
  sFriends:any;
  accounts:any;
  roles:any = [];
  constructor(private sConnect:SpringConnectService) { }

  ngOnInit() {
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
    //testConnection
    if (this.jwt != null &&  this.jwt.length>0){
      this.sConnect.getAccountsByPage(this.accPage).subscribe(
        data => {this.accounts = data;
                  console.log(data)},
        error => console.log(error)
      )

      this.sConnect.getSpecialFriendsByPage(this.sfPage).subscribe(
        data => {this.sFriends = data;
                  console.log(data)},
        error => console.log(error)
      )
      this.sConnect.getAllRoles().subscribe(
        data =>{this.roles = data; console.log(data)},
        error => console.log(error)
      )
    }
  }

  incPageSF(){
    if (this.sfPage < this.sfMax){
      this.sfPage++;
      this.sConnect.getSpecialFriendsByPage(this.sfPage).subscribe(
        (data:any) => {
            if(data.length < 5 && data.length > 0){
              //this.sfPage++;
              this.sfMax = this.sfPage
              this.sFriends = data;
            }
            else if(data.length == 0){
             
              this.sfMax=this.sfPage
              this.sfPage--;
              this.incPageSF()
            }
            else{
              
              this.sFriends = data;
            }
            console.log("inc" + this.sfPage)
                  console.log(data)},
        error => console.log(error)
      )
    }
  }
  
  decPageSF(){
    if (this.sfPage > 0){
      this.sfPage--;
      this.sConnect.getSpecialFriendsByPage(this.sfPage).subscribe(
        (data:any) => {
              this.sFriends = data;
              console.log("dec" + this.sfPage)
                  console.log(data)},
        error => console.log(error)
      )
    }
  }

  incPageAcc(){
    if (this.accPage < this.accMax){
      this.accPage++;
      this.sConnect.getAccountsByPage(this.accPage).subscribe(
        (data:any) => {
            if(data.length < 5 && data.length > 0){
             
              this.accMax = this.accPage
              this.accounts = data;
            }
            else if(data.length == 0){
              
              this.accMax=this.accPage
              this.accPage--;
              this.incPageAcc()
            }
            else{
             
              this.accounts = data;
            }
            console.log("inc" + this.accPage)
                  console.log(data)},
        error => console.log(error)
      )
    }
  }

  decPageAcc(){
    if (this.accPage > 0){
      this.accPage--;
      this.sConnect.getAccountsByPage(this.accPage).subscribe(
        (data:any) => {
              this.accounts = data;
                console.log("dec" + this.accPage)
                  console.log(data)},
        error => console.log(error)
      )
    }
  }

}
