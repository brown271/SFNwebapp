import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password:string;
  username:string;
  jwt: string;
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
      },
      error =>{
        console.log(error);
      }

    )
    this.username = ""
    this.password = ""
  }

}
