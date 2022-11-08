import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { ViewWillEnter } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

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
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  year:number;
  constructor(private sConnect:SpringConnectService) { }
  offset: number = -1;//

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

  openModal(color, header, body){
    console.log("open");
    let modal = document.getElementById('modal'); //show our modal
    this.modalBody = body;
    this.modalColor = color;
    this.modalHeader = header;
   
    document.getElementById("mainForm").classList.toggle("myopia");
    

  }

  parseEventIntoArray(event){
    
    let array = [
      "Event Name: " + event.name
    ]
    if(event.address != undefined && event.address.length > 0)
    array.push("Address: " + event.address )
    if(event.date != undefined )
    array.push("Date: " + event.date )
    if(event.description != undefined && event.description.length > 0)
    array.push("Description: " + event.description )
    if(event.host != undefined && event.host.length > 0)
    array.push("Host: " + event.host )
    if(event.isOnline != undefined ){
      if(event.isOnline){
        array.push("Online Event")
      }
      else{
        array.push("In Person Event")
      }

    }
    
    if(event.linkToEvent != undefined && event.linkToEvent.length > 0)
    array.push("Link: " + event.linkToEvent )
    if(event.time != undefined)
    array.push("Time: " + event.time )
   console.log(array)
    return array;
    
  }

  

  closeModal(){
    let modal = document.getElementById('modal');
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
    document.getElementById("mainForm").classList.toggle("myopia");
  }

  findOffsetValue(date:Date){
    let index = -1;
    if (date.getMonth() == this.month && date.getFullYear() == this.year){
      let dateNumber = date.getDate()
      for(let i = 0; i < this.cal.length; i++){
        let tempDate = new Date(this.cal[i].date).getDate();
        if( tempDate == dateNumber){
          console.log("Match between " + tempDate + " and " + dateNumber)
          if(index == -1){
            index = i-1;
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

  select(event){
    this.openModal("#3232CD", "INFO" ,this.parseEventIntoArray(event))
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
        this.cal = data;
        this.monthString = this.monthArray[this.month]
        let date = new Date();
        this.curDayOffset = this.findOffsetValue(date);
      },
      error => {
        console.log(error)
        if (error.status == 504){
          this.errorMsg = "Error 504: Can't find Database!"
        }
      }
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
        this.cal = data;
        this.monthString = this.monthArray[this.month]
        let date = new Date();
        this.curDayOffset = this.findOffsetValue(date);
      },
      error => {
        console.log(error)
        if (error.status == 504){
          this.errorMsg = "Error 504: Can't find Database!"
        }
      }
    )
  }

  

  



}
