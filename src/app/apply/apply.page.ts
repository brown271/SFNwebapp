import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit, ViewWillEnter {
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  formData:any = [];
  constructor(private sConnect: SpringConnectService) { }

  refreshData(){
    this.formData.specialFriendInfo = this.makeNewSpecialFriend();
    this.formData.personalInfo = this.makeNewPersonalInfo();
    this.formData.additionalInfo = this.makeNewAdditionalInfo();
    
  }

  ionViewWillEnter(): void {
    this.refreshData()
  }
  ngOnInit() {
    this.refreshData()
   
  }

  submit(){
    let application={
      id:null,
      personalInfo:this.formData.personalInfo,
      additionalInfo:this.formData.additionalInfo,
      howToComfort:this.formData.specialFriendInfo.howToComfort,
      isCostAFactor:this.formData.specialFriendInfo.isCostAFactor,
      isBirthdayClubMember:this.formData.specialFriendInfo.isBirthdayClubMember
    }

    this.sConnect.createApplication(application).subscribe(
            (data:any)=> {
              console.log(data)
              if(data.status == 200){
                
                this.formData.specialFriendInfo = this.makeNewSpecialFriend();
                this.formData.personalInfo = this.makeNewPersonalInfo();
                this.formData.additionalInfo = this.makeNewAdditionalInfo();
                this.openModal("#32CD32","SUCCESS",[data.message])
              }
              else{
                
                this.openModal("#CD3232","ERROR",data.message.split(";"))
              }
            },
            error=> {
              console.log(error)
            }
          )
    
  }

  openModal(color, header, body){
    let modal = document.getElementById('modal'); //show our modal
    this.modalBody = body;
    this.modalColor = color;
    this.modalHeader = header;
    document.getElementById("mainForm").classList.toggle("myopia");

  }

  closeModal(){
    let modal = document.getElementById('modal');
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
    document.getElementById("mainForm").classList.toggle("myopia");
  }

  makeNewSpecialFriend(){
    let data = {

      howToComfort:  "",
      isCostAFactor:  false,
      isBirthdayClubMember:  false,
    }
   return data

  }

  makeNewAdditionalInfo(){
    let data = {
      allergies:  "",
      favouriteEvents:  "",
      needsToBeMet:  "",
      additionalComments:  "",
      emergencyContactName:  "",
      emergencyContactRelation:  "",
      emergencyContactPhoneNumber: "",
      isPhotoPermissionSigned: false,
      specialNeeds: ""
    }
    return data;
  }

  makeNewPersonalInfo(){
    let data = {
      firstName:  "",
      lastName:  "",
      birthDate: new Date(),
      phoneNumber:"",
      email:""
    }
    return data;
  }

}
