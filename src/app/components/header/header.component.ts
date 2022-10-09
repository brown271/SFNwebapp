import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from 'src/app/spring-connect.service';
import { ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, ViewWillEnter {

  jwt: string;
  constructor(private sConnect: SpringConnectService) { }

  ngOnInit() {
    this.refreshData()
  }
  ionViewWillEnter(): void {
    this.refreshData()
  }

  refreshData(){
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
  }
}
