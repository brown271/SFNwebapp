import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  jwt:string;

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
}
