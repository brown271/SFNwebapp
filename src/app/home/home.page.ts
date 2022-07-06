import { Component } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sConnect: SpringConnectService) {}
  testConn(){
    this.sConnect.testConnection().subscribe(
      (data:String) => console.log(data),
      error => console.log(error)
    )
  }
}
