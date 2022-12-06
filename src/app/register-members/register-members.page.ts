import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { HttpHeaders } from '@angular/common/http';
import { ViewWillEnter } from '@ionic/angular';
import { ViewDidLeave } from '@ionic/angular';

@Component({
  selector: 'app-register-members',
  templateUrl: './register-members.page.html',
  styleUrls: ['./register-members.page.scss'],
})
export class RegisterMembersPage implements OnInit, ViewWillEnter, ViewDidLeave{

  jwt:string;
  editableRoles: any
  formData:any;
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  errorMsg: string;
  constructor(private sConnect: SpringConnectService ) { 
  }

  ionViewDidLeave(): void {
    this.sConnect.updateFormData([])
  }


  refreshData(){
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
    this.sConnect.checkForJWTCookie();
    this.errorMsg = "";
    this.sConnect.formData.subscribe(data => this.formData = data)

    let authHeader  = new HttpHeaders().set('Authorization',  'Bearer ' + this.jwt);
    this.sConnect.getEditableRoles().subscribe(
      data =>{this.editableRoles = data},
      error =>{
        if(error.status == 403){
          this.sConnect.updateJWT("");
        }
      }
    )
    if(document.getElementById("mainForm") != undefined){
      if(document.getElementById("mainForm").classList.contains("myopia")){
        document.getElementById("mainForm").classList.toggle("myopia")
      }
    }
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

  closeModal(){
    let modal = document.getElementById('modal');
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
    document.getElementById("mainForm").classList.toggle("myopia");
  }

  isUserAbleToCreate(accountType){
    for(let i = 0; i < this.editableRoles.length;i++){
      if (this.editableRoles[i].roleName === accountType){
        return true
      }
    }
      return false
  }

  makeNewSpecialFriend(){
    let data = {
      type:"SPECIAL_FRIEND",
      function:"CREATE",
      specialFriendInfo: this.makeBlankSpecialFriendFormInfo(),
      additionalInfo: this.makeBlankAdditionalInfo(),
      personalInfo: this.makeBlankPersonalInfo()
    }
    this.sConnect.updateFormData(data)

  }

  makeNewAdmin(){
    let data = {
      type:"ADMIN",
      function:"CREATE",
      account: this.makeBlankAccountInfo("ADMIN")
    }
    this.sConnect.updateFormData(data)
  }

  makeNewTeamMember(){
    let data = {
      type:"TEAM_MEMBER",
      function:"CREATE",
      account: this.makeBlankAccountInfo("TEAM_MEMBER"),
      additionalInfo: this.makeBlankAdditionalInfo()
    }
    this.sConnect.updateFormData(data)
  }

  makeNewVolunteer(){
    let data = {
      type:"VOLUNTEER",
      function:"CREATE",
      account: this.makeBlankAccountInfo("VOLUNTEER"),
      additionalInfo: this.makeBlankAdditionalInfo()
    }
    this.sConnect.updateFormData(data)
  }

  makeBlankSpecialFriendFormInfo(){
    let blankSFInfo = {
      howToComfort:  "",
      isCostAFactor:  false,
      isBirthdayClubMember:  false
    }
    return blankSFInfo;
    
  }

  makeBlankAccountInfo(role){
    let blankAccountInfo = {
      username: "",
      password: "",
      role: role,
      personalInfo: this.makeBlankPersonalInfo(),
      rolesFromServer: []
    }
    return blankAccountInfo
  }

  makeBlankPersonalInfo(){
    let blankPersonalInfo = {
      firstName:  "",
      lastName:  "",
      birthDate: new Date(),
      phoneNumber:"",
      email:""
    }
    return blankPersonalInfo

  }

  create(){
    console.log(this.formData);
    
    if(this.formData.type === "VOLUNTEER"){
      let volunteer={
        id:null,
        account:this.formData.account,
        additionalInfo:this.formData.additionalInfo
      }
      this.sConnect.addVolunteer(volunteer).subscribe(
        (data:any)=> {
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message])
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split(";"))
          }
         
        },
        error=> {
         
        }
      )
    }
    else if(this.formData.type === "TEAM_MEMBER"){
      let teamMember={
        id:null,
        account:this.formData.account,
        additionalInfo:this.formData.additionalInfo
      }
      this.sConnect.addTeamMember(teamMember).subscribe(
        (data:any)=> {
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message])
          }
          else{
            
            this.openModal("#CD3232","ERROR",data.message.split(";"))
          }
        },
        error=> {
         
        }
      )
    }
    else if(this.formData.type === "ADMIN"){
      let admin ={
        id:null,
        account:this.formData.account
      }
      this.sConnect.addAdmin(admin).subscribe(
        (data:any)=> {
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message])
          }
          else{
            
            this.openModal("#CD3232","ERROR",data.message.split(";"))
          }
        },
        error=> {
         
        }
      )
    }
    else if(this.formData.type === "SPECIAL_FRIEND"){
      let specialFriend={
        id:null,
        personalInfo:this.formData.personalInfo,
        additionalInfo:this.formData.additionalInfo,
        howToComfort:this.formData.specialFriendInfo.howToComfort,
        isCostAFactor:this.formData.specialFriendInfo.isCostAFactor,
        isBirthdayClubMember:this.formData.specialFriendInfo.isBirthdayClubMember
      } 
      this.sConnect.addSpecialFriend(specialFriend).subscribe(
        (data:any)=> {
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message])
          }
          else{
            
            this.openModal("#CD3232","ERROR",data.message.split(";"))
          }
        },
        error=> {
        }
      )
    }else{

    }
  }

  edit(){
    console.log(this.formData);
    if(this.formData.type === "VOLUNTEER"){
      let volunteer ={
        id:null,
        account:this.formData.account,
        additionalInfo: this.formData.additionalInfo
      }
      this.sConnect.updateVolunteer(volunteer).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message]);
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split(";"));
          }
        },
        error=>console.log(error)
      )
    }
    else if(this.formData.type === "TEAM_MEMBER"){
      let teamMember ={
        id:null,
        account:this.formData.account,
        additionalInfo: this.formData.additionalInfo
      }
      this.sConnect.updateTeamMember(teamMember).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message]);
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split(";"));
          }
        },
        error=>console.log(error)
      )
    }
    else if(this.formData.type === "ADMIN"){
      let admin ={
        id:null,
        account:this.formData.account
      }
      this.sConnect.updateAdmin(admin).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message]);
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split(";"));
          }
        },
        error=>console.log(error)
      )
    }
    else if(this.formData.type === "SPECIAL_FRIEND"){
      let specialFriend ={
        id: this.formData.id,
        personalInfo:this.formData.personalInfo,
        additionalInfo: this.formData.additionalInfo,
        howToComfort:  this.formData.specialFriendInfo.howToComfort,
        isCostAFactor:  this.formData.specialFriendInfo.isCostAFactor,
        isBirthdayClubMember:  this.formData.specialFriendInfo.isBirthdayClubMember
      }
      this.sConnect.updateSpecialFriend(specialFriend).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.sConnect.updateFormData([])
            this.openModal("#32CD32","SUCCESS",[data.message]);
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split(";"));
          }
        },
        error=>console.log(error)
      )
    }else{

    }
  }

  makeBlankAdditionalInfo(){
    let blankAdditionalInfo = {
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
    return blankAdditionalInfo
  }


}
