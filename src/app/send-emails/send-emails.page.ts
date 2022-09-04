import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-send-emails',
  templateUrl: './send-emails.page.html',
  styleUrls: ['./send-emails.page.scss'],
})
export class SendEmailsPage implements OnInit {

  selectedGroups: any[] =[]
  constructor(private sConnect: SpringConnectService, private alertController: AlertController) { }

  bannerInfo:string = "";
  errorMessage: string = "";
  jwt: string ="";
  emailList: any;
  page: number = 0;
  max: number = 100;
  subject:String ="";
  body:String ="";

  curItem: any;

  currentGroup: any;
  ngOnInit() {
    console.log("babbooey")
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
    this.sConnect.getEmailGroupByPage(this.page).subscribe(
      data => {this.emailList = data;console.log(this.emailList)},
      error => {
        if (error.status == 504){
          this.bannerInfo = "Error 504: Can't find Database!"
        }
        else{
          this.bannerInfo = "Error " + error.status
        }
      }
    )
  }

  inc(){
    if (this.page < this.max){
      this.page++;
      this.sConnect.getEmailGroupByPage(this.page).subscribe(
        data => {this.emailList = data},
        error => {
           if (error.status == 504){
          this.bannerInfo = "Error 504: Can't find Database!"
        }
        else{
          this.bannerInfo = "Error " + error.status
        }}
      )
    }

  }

  dec(){
    if (this.page > 0){
      this.page--;
      this.sConnect.getEmailGroupByPage(this.page).subscribe(
        data => {this.emailList = data},
        error => {
          if (error.status == 504){
            this.bannerInfo = "Error 504: Can't find Database!"
          }
          else{
            this.bannerInfo = "Error " + error.status
          }
        }
      )
    }
  }

  openModal(item){
    let modal = document.getElementById('modal'); //show our modal
    modal.style.display = "block";
    console.log("item: " + item)
    this.curItem = item;
   // document.getElementById('modal-header-text').innerHTML = header; //show header 
    //document.getElementById('modal-body-desc').innerHTML = description; //show description
    //make our body for both team members and special friends

  }

  isEmailGroupInSelectedGroups(item){
    for (let i = 0; i < this.selectedGroups.length; i++){
      if(this.selectedGroups[i].id == item.id){
        return true;
      }
    }
    return false;
  }

  toggleGroup(item){
  
    if (this.selectedGroups.indexOf(item) !== -1){
      this.selectedGroups = this.selectedGroups.filter((value)=>value!=item)
      console.log(this.selectedGroups)
    }
    else{
      this.selectedGroups.push(item);
      console.log(this.selectedGroups)
    }
  }

  //UPDATE THIS TO USE THE IS EMAILGROUPINSELECTEDGROUPS FUNCTION PLEASE!!
  sendEmail(){
    let emailInfo = new Array<String>();
    for(let i = 0; i < this.selectedGroups.length;i++){
      if (this.selectedGroups[i].sFriends != undefined){
        for(let j = 0; j < this.selectedGroups[i].sFriends.length;j++){
          if (!emailInfo.includes(this.selectedGroups[i].sFriends[j].email)){
            emailInfo.push(this.selectedGroups[i].sFriends[j].email);
          }
        }
      }
      if (this.selectedGroups[i].sfAccounts != undefined){
        for(let j = 0; j < this.selectedGroups[i].sfAccounts.length;j++){
          if (!emailInfo.includes(this.selectedGroups[i].sfAccounts[j].email)){
            emailInfo.push(this.selectedGroups[i].sfAccounts[j].email);
          }
        }
      }
    }
    
    emailInfo.push(this.subject)
    emailInfo.push(this.body)
    if(this.isEmailValid(emailInfo)){
      this.sConnect.sendEmail(emailInfo).subscribe(
        data => {console.log(data)},
        error => {
          if (error.status == 504){
            this.bannerInfo = "Error 504: Can't find Database!"
          }
          else{
            this.bannerInfo = "Error " + error.status
          }
        }
      )
    }else{
      this.errorMessage = this.errorMessage.substring(0,this.errorMessage.length-4)
      this.sendAlert(this.errorMessage);
      this.errorMessage = "";
    }
    
    
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

  isEmailValid(emailInfo){
    if (emailInfo.length < 3){
      this.errorMessage += "Atleast one email group needs to be selected. <hr>";
    }
    if(this.subject.length == 0){
      this.errorMessage += "Email subject is empty. <hr>";
    }
    if(this.subject.length > 80){
      this.errorMessage += "Email subject is too long, max is 80 characters. <hr>";
    }
    if(this.body.length == 0){
      this.errorMessage += "Email body is empty. <hr>";
    }
    if(this.body.length > 500){
      this.errorMessage += "Email body is too long, max is 500 characters. <hr>";
    }
    if(this.errorMessage.length > 0){
      return false;
    }
    return true;
  }

  closeModal(){
    let modal = document.getElementById('modal');
    modal.style.display = "none";
    this.curItem = [];
  }

 



}
