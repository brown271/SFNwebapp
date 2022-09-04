import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMsg: string = "";
  cal:any;
  month:number;
  monthString:string;
  curDayOffset:number;
  year:number;
  password:string ="";
  username:string ="";
 
  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  constructor(private sConnect: SpringConnectService, private alertController: AlertController) { }
  
  jwt: string;
  ngOnInit() {
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
  }
  login(){
    if (this.username.length > 0 && this.password.length > 0){
      const params = { username: this.username, password: this.password };
      this.sConnect.login(params).subscribe(
        (data:any) => {
          let jwt: HttpHeaders = data.headers.get("token")
          this.sConnect.updateJWT(jwt);
          console.log("JWT: " + this.jwt)
          this.sConnect.getCalendar().subscribe(
            (data:any) => {
              this.cal = data;
              let date = new Date();
              this.month = date.getMonth();
              this.monthString = this.monthArray[this.month]
      
              this.year = date.getFullYear();
              this.curDayOffset = this.findOffsetValue(date);
              
              console.log(this.curDayOffset)
            },
            error => {
             console.log(error)
            }
          )
        },
        error =>{
          if (error.status == 504){
            this.errorMsg = "Error 504: Can't find Database!"
          }
          else{
            this.errorMsg = "Incorrect username or password!"
          }
        }
  
      )
      this.username = ""
      this.password = ""
    }
    else{
      this.sendAlert("Username or Password was not entered!")
    }
    
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
   console.log("Target Date: " + date);
   console.log("current month: " + this.monthArray[this.month]);
   console.log("current year: " + this.year)
    let index = -1;
    if (date.getMonth() == this.month && date.getFullYear() == this.year){
      let dateNumber = date.getDate()
      for(let i = 0; i < this.cal.length; i++){
        if(this.cal[i].date == dateNumber){
          console.log("Match between " + this.cal[i].date + " and " + dateNumber)
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
  
  async sendAlert(msg) {
    const alertNotif = await this.alertController.create({
      header: 'Error :(',
      subHeader: '',
      message: msg,
      buttons: [
        { text: 'OK' }
      ]
    })
    await alertNotif.present();
  }


}
