import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from 'src/app/spring-connect.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  jwt: string;
  constructor(private sConnect: SpringConnectService) { }

  ngOnInit() {
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
  }

}
