import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { AlertController } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventserviceService } from '../eventservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {
  errorMsg: string = "";
  cal:any;
  month:number;
  monthString:string;
  curDayOffset:number;
  year:number;
  password:string ="";
  username:string ="";
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  modal:any = {
    modalHeader: "",
  }
 
  monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  constructor(private sConnect: SpringConnectService, private alertController: AlertController, private router: Router, private eventService: EventserviceService) { }
  refreshData(){
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
    this.sConnect.checkForJWTCookie();
    this.errorMsg = "";
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
        }
      )
    
  }
  ionViewWillEnter(): void {
    this.refreshData()
  }
  jwt: string;
  ngOnInit() {
    this.refreshData()
  }
  login(){
    if (this.username.length > 0 && this.password.length > 0){
      const params = { username: this.username, password: this.password };
      this.sConnect.login(params).subscribe(
        (data:any) => {
          let jwt: HttpHeaders = data.headers.get("Key")
          this.sConnect.updateJWT(jwt);
          console.log("JWT: " + this.jwt)
          this.sConnect.saveJWTCookie();
          console.log(this.sConnect.checkForJWTCookie())
          this.sConnect.getCalendar().subscribe(
            (data:any) => {
              this.cal = data;
              let date = new Date();
              this.month = date.getMonth();
              this.monthString = this.monthArray[this.month]
      
              this.year = date.getFullYear();
              this.curDayOffset = this.findOffsetValue(date);
            },
            error => {
             console.log(error)
            }
          )
        },
        error =>{
          console.log(error)
          if (error.status == 504){
            this.errorMsg = "Error 504: Can't find Database!"
          }
          else if(error.status == 401){
            this.sendAlert("Username or Password was invalid!")
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
        this.cal = data;
        this.monthString = this.monthArray[this.month]
        let date = new Date();
        this.curDayOffset = this.findOffsetValue(date);
      },
      error => console.log(error)
    )
  }

  openModal(modalData){
    console.log("open");
    this.modal = modalData
    document.getElementById("mainForm").classList.toggle("myopia");

  }

  closeModal(){
    this.modal.modalHeader = ""
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

  openGroup(){
    this.openModal({
      modalHeader: "GROUPS",
      modalColor: "#9932CC",
      func1:() => {this.router.navigate(['create-group'])},
      func2:() => {this.router.navigate(['edit-groups'])},
      desc1: "Create Groups",
      desc2: "Edit Groups",
      img1: "../../assets/images/CGroup.png",
      img2: "../../assets/images/EGroup.png",
      c1: "genepurp",
      c2: "genepurp"
    })
  }

  openAccount(){
    this.openModal({
      modalHeader: "ACCOUNTS",
      modalColor: "#F08000",
      func1:() => {this.router.navigate(['register-members'])},
      func2:() => {this.router.navigate(['search-accounts'])},
      desc1: "Create Accounts",
      desc2: "Edit Accounts",
      img1: "../../assets/images/CAccount.png",
      img2: "../../assets/images/EAccount.png",
      c1: "alexorang",
      c2: "alexorang"
    })
  }

  openEvent(){
    this.openModal({
      modalHeader: "EVENTS",
      modalColor: "#387E9B",
      func1:() => { this.eventService.makeNewEmptyForm();this.router.navigate(['create-events'])},
      func2:() => {this.router.navigate(['search-events'])},
      desc1: "Create Events",
      desc2: "Edit Events",
      img1: "../../assets/images/CEvent.png",
      img2: "../../assets/images/EEvent.png",
      c1: "bradleyblue",
      c2: "bradleyblue"
    })
  }

  


}
