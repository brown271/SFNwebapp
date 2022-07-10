import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  
  constructor(private sConnect:SpringConnectService) { }

  ngOnInit() {
  }

  getCalendar(){
    console.log("check cal")
    this.sConnect.getCalendar().subscribe(
      (data:any) => console.log(data),
      error => console.log(error)
    )
  }

}
