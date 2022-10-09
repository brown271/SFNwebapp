import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit, ViewWillEnter {
  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  errorMsg:string = "";
  cal:any;
  month:number;
  monthString:string;
  curDayOffset:number;
  year:number;
  constructor(private sConnect:SpringConnectService) { }
  offset: number = -1;

  refreshData(){
    this.sConnect.getCalendar().subscribe(
      (data:any) => {
        console.log(data)
        this.cal = data;
        let date = new Date();
        this.month = date.getMonth();
        this.monthString = this.monthArray[this.month]

        this.year = date.getFullYear();
        this.curDayOffset = date.getDate();
      },
      error => {
        if (error.status == 504){
          this.errorMsg = "Error 504! Can't connect to database. Try Refreshing Webpage!"
        }
      }
    )
  }
  ionViewWillEnter(): void {
    this.refreshData()
  }


  ngOnInit() {
    this.refreshData()
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
        this.curDayOffset = this.findOffsetValue(date);
        
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
        this.curDayOffset = this.findOffsetValue(date);
      },
      error => console.log(error)
    )
  }

  findOffsetValue(date:Date){
   
    let index = -1;
    if (date.getMonth() == this.month && date.getFullYear() == this.year){
      let dateNumber = date.getDay()
      for(let i = 0; i < this.cal.length; i++){
        if(this.cal[i].date == dateNumber){
          if(index == -1){
            index = i;
          }
          else{
            if(dateNumber > 14){
              index = i;
            }
          }
        }
      }
    }
   return index;
  }

  

  



}
