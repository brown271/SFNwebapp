import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  cal:any;
  month:number;
  monthString:string;
  day:number;
  year:number;
  password:string;
  username:string;
  jwt: string;
  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  constructor(private sConnect: SpringConnectService) { }
  

  ngOnInit() {
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
  }
  login(){
    console.log("pass: " + this.password + " user: " + this.username)
    const params = { username: this.username, password: this.password };
    this.sConnect.login(params).subscribe(
      (data:any) => {
        let jwt: HttpHeaders = data.headers.get("token")
        this.sConnect.updateJWT(jwt);
        console.log("JWT: " + this.jwt)
        this.sConnect.getCalendar().subscribe(
          (data:any) => {
            console.log(data)
            this.cal = data;
            let date = new Date();
            this.month = date.getMonth();
            this.monthString = this.monthArray[this.month]
    
            this.year = date.getFullYear();
            this.day = date.getDate();
          },
          error => console.log(error)
        )
      },
      error =>{
        console.log(error);
      }

    )
    this.username = ""
    this.password = ""
  }

  inc(){
    if (this.month >= 11){
      this.month = 0
      this.year = this.year+1
    }else{
      this.month++;
    }
    this.sConnect.getSpecificCalendar(this.month+1,this.year).subscribe(
      (data:any) => {
        //console.log(data)
        this.cal = data;
        this.monthString = this.monthArray[this.month]
        let date = new Date();
        if (date.getMonth() == this.month && date.getFullYear() == this.year){
          this.day = date.getDate()
        }
        else{
          this.day = 32;
        }
        
      },
      error => console.log(error)
    )
  }

  dec(){
    if (this.month <= 0){
      this.month = 11
      this.year = this.year-1
    }else{
      this.month--;
    }
    this.sConnect.getSpecificCalendar(this.month+1,this.year).subscribe(
      (data:any) => {
        //console.log(data)
        this.cal = data;
        this.monthString = this.monthArray[this.month]
        let date = new Date();
        if (date.getMonth() == this.month && date.getFullYear() == this.year){
          this.day = date.getDate()
        }
        else{
          this.day = 32;
        }
      },
      error => console.log(error)
    )
  }

}
