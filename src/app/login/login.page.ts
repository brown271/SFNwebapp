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
  constructor(private sConnect: SpringConnectService) { }

  ngOnInit() {
  }
  login(){
    console.log("pass: " + this.password + " user: " + this.username)
    const params = { username: this.username, password: this.password };
    this.sConnect.login(params)
    this.username = ""
    this.password = ""
  }

}
