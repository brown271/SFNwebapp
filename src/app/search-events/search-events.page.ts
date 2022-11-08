import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { SpringConnectService } from '../spring-connect.service';
import { EventserviceService } from '../eventservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-events',
  templateUrl: './search-events.page.html',
  styleUrls: ['./search-events.page.scss'],
})
export class SearchEventsPage implements OnInit, ViewWillEnter {
  jwt: string;
  bannerInfo: string;
  cal:any;
  month:number;
  monthString:string;
  searchKey: string;
  searchResults: any = []
  curDayOffset:number;
  year:number;
  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  constructor(private sConnect: SpringConnectService, private eventService: EventserviceService, private router: Router) { }

  ionViewWillEnter(): void {
    this.refreshData();
  }
  ngOnInit() {
    this.refreshData();
  }


  refreshData(){
    this.sConnect.jwtObs.subscribe(data => { this.jwt = data });
    this.sConnect.checkForJWTCookie();
    this.bannerInfo = "";
    this.sConnect.getCalendar().subscribe(
      (data:any) => {
        console.log(data)
        this.cal = data;
        let date = new Date();
        this.month = date.getMonth();
        this.monthString = this.monthArray[this.month]
        this.year = date.getFullYear();
        this.curDayOffset = this.findOffsetValue(date);
      },
      error => {
       console.log(error)
       if (error.status == 504){
        this.bannerInfo = "Error 504: Can't find Database!"
      }
      }
    )
      if(document.getElementById("mainForm") != undefined){
        if(document.getElementById("mainForm").classList.contains("myopia")){
          document.getElementById("mainForm").classList.toggle("myopia")
        }
      }
   
    
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
          this.bannerInfo = "Error 504: Can't find Database!"
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
          this.bannerInfo = "Error 504: Can't find Database!"
        }
      }
    )
  }

  select(event){
    this.eventService.updateEventFormData(event);
    this.router.navigate(['create-events'])
    
  }

  find(){
    if(this.searchKey.length > 0){
      this.sConnect.findEventByName(this.searchKey).subscribe(
        data =>{
          this.searchResults = data
        },
        error =>{
          console.log(error)
        }
      )
    }
   
  }

}
