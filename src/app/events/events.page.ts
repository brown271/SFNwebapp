import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  cal:any;
  month:number;
  monthString:string;
  day:number;
  year:number;
  constructor(private sConnect:SpringConnectService) { }

  ngOnInit() {
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
