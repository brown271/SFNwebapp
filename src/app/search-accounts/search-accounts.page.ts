import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { HttpHeaders } from '@angular/common/http';
import { ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.page.html',
  styleUrls: ['./search-accounts.page.scss'],
})
export class SearchAccountsPage implements OnInit, ViewWillEnter, ViewWillLeave {

  
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  isConfirmModal: boolean = false;
  currentUser: any;
  searchResults: any = []
  searchKey = "";
  editableRoles: any = []
  jwt:string = "";

  constructor(private sConnect:SpringConnectService, private router: Router) { }

  refreshData(){
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
  }
  ionViewWillEnter(): void {
    this.refreshData()
  }
  ngOnInit() {
    this.refreshData()
  }

  ionViewWillLeave(): void {
    this.searchKey = ""
    this.searchResults = []
  }

  openModal(color, header, body, isConfirmModal){
    console.log("open");
    let modal = document.getElementById('modal'); //show our modal
    this.modalBody = body;
    this.modalColor = color;
    this.modalHeader = header;
    this.isConfirmModal = isConfirmModal;
    

  }

  openDeleteModal(item){
    this.currentUser = item;
    this.openModal("#ffa550", "CONFIRM", ["Are you sure you wish to delete?","Action cannot be undone"],true)
  }

  closeModal(){
    let modal = document.getElementById('modal');
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
    this.isConfirmModal = false;
    this.currentUser = null;
  }

  packageAccountToBeEdited(account,role){
    console.log(account)
    let packagedAccount = {
      id:account.id,
      username: "[PROTECTED]",
      password: "[PROTECTED]",
      role: role,
      personalInfo: this.packagePersonalInfoToBeEdited(account.personalInfo)
    }
    return packagedAccount;
  }

  packagePersonalInfoToBeEdited(personalInfo){
    let packagedPersonalInfo = {
      firstName:  personalInfo.firstName,
      lastName:  personalInfo.lastName,
      birthDate: personalInfo.birthDay,
      phoneNumber:personalInfo.phoneNumber,
      email:personalInfo.email
    }
    return packagedPersonalInfo
  }

  packageAdditionalInfoToBeEdited(additionalInfo){
    let packagedAdditionalInfo = {
      allergies:  additionalInfo.allergies,
      favouriteEvents:  additionalInfo.favouriteEvents,
      needsToBeMet:  additionalInfo.needsToBeMet,
      additionalComments:  additionalInfo.additionalComments,
      emergencyContactName:  additionalInfo.emergencyContactName,
      emergencyContactRelation:  additionalInfo.emergencyContactRelation,
      emergencyContactPhoneNumber: additionalInfo.emergencyContactPhoneNumber,
      isPhotoPermissionSigned: false,
      specialNeeds: additionalInfo.specialNeeds
    }
    return additionalInfo
  }

  updateUser(item, role){
  console.log(item.user)
    if(role == "ADMIN"){
      this.sConnect.getAdminById(item.id).subscribe(
        (data:any) =>{
          console.log(data)
          let admin = {
            type:"ADMIN",
            function:"EDIT",
            account: this.packageAccountToBeEdited(data.user.account,role)
          }
          this.sConnect.updateFormData(admin);
          this.router.navigate(['register-members'])
        },
        error =>{ console.log(error)}
      )
      
    }
    else if(role == "TEAM_MEMBER"){
      this.sConnect.getTeamMemberById(item.id).subscribe(
        (data:any) =>{
          console.log(data)
          let teamMember = {
            type:"TEAM_MEMBER",
            function:"EDIT",
            account: this.packageAccountToBeEdited(data.user.account,role),
            additionalInfo: this.packageAdditionalInfoToBeEdited(data.user.additionalInfo)
          }
          this.sConnect.updateFormData(teamMember);
          this.router.navigate(['register-members'])
        },
        error =>{ console.log(error)}
      )
    }
    else if(role == "VOLUNTEER"){
      this.sConnect.getVolunteerById(item.id).subscribe(
        (data:any) =>{
          console.log(data)
          let volunteer = {
            type:"VOLUNTEER",
            function:"EDIT",
            account: this.packageAccountToBeEdited(data.user.account,role),
            additionalInfo: this.packageAdditionalInfoToBeEdited(data.user.additionalInfo)
          }
          this.sConnect.updateFormData(volunteer);
          this.router.navigate(['register-members'])
        },
        error =>{ console.log(error)}
      )
    }
    else if(role == 'SPECIAL_FRIEND'){
      this.sConnect.getSpecialFriendById(item.id).subscribe(
        (data:any) =>{
          console.log(data)
          let specialFriend = {
            id:data.user.id,
            type:"SPECIAL_FRIEND",
            function:"EDIT",
            specialFriendInfo: {
              howToComfort:  data.user.howToComfort,
              isCostAFactor:  data.user.isCostAFactor,
              isBirthdayClubMember:  data.user.isBirthdayClubMember
            },
            additionalInfo: this.packageAdditionalInfoToBeEdited(data.user.additionalInfo),
            personalInfo: this.packagePersonalInfoToBeEdited(data.user.personalInfo)
          }
          this.sConnect.updateFormData(specialFriend);
          this.router.navigate(['register-members'])
        },
        error =>{ console.log(error)}
      )
    }
  }

  parseAdminIntoArray(admin){
    console.log(admin)
    let array =[
      "Name: " + admin.user.account.personalInfo.firstName + " "  + admin.user.account.personalInfo.lastName,
      "Email: " + admin.user.account.personalInfo.email,
      "Role: " + admin.user.account.role.roleName
    ]
    return array;
  }

  parseVolunteerIntoArray(volunteer){
    let array = [
      "Name: " + volunteer.user.account.personalInfo.firstName + " "  + volunteer.user.account.personalInfo.lastName,
      "Email: " + volunteer.user.account.personalInfo.email,
      "Role: " + volunteer.user.account.role.roleName
    ]
    array = array.concat(this.parseAdditionalInfoIntoArray(volunteer.user.additionalInfo))
    return array;
   
  }

  parseAdditionalInfoIntoArray(additionalInfo){
    let array = [
      "Emergency Contact: " + additionalInfo.emergencyContactName + 
      " - " + additionalInfo.emergencyContactRelation +
      " - " + additionalInfo.emergencyContactPhoneNumber
    ]
    if(additionalInfo.additionalComments != undefined)
    array.push("Additional Comments: " + additionalInfo.additionalComments )
    if(additionalInfo.allergies != undefined)
    array.push("Allergies: " +additionalInfo.allergies )
    if(additionalInfo.favouriteEvents != undefined)
    array.push("Favourite Events: " + additionalInfo.favouriteEvents )
    if(additionalInfo.needsToBeMet != undefined)
    array.push("Needs to be Met: " + additionalInfo.needsToBeMet )
    if(additionalInfo.specialNeeds != undefined)
    array.push("Special Needs: " + additionalInfo.specialNeeds )
    return array;
  }

  parseTeamMemberIntoArray(teamMember){
    let array = [
      "Name: " + teamMember.user.account.personalInfo.firstName+ " "  +teamMember.user.account.personalInfo.lastName,
      "Email: " + teamMember.user.account.personalInfo.email,
      "Role: " + teamMember.user.account.role.roleName
      
    ]
    array = array.concat(this.parseAdditionalInfoIntoArray(teamMember.user.additionalInfo))
    return array;
  }

  parseSpecialFriendIntoArray(specialFriend){
    let array = [
      "Name: " + specialFriend.user.personalInfo.firstName + " "  + specialFriend.user.personalInfo.lastName,
      "Email: " + specialFriend.user.personalInfo.email,
      "Role: SPECIAL_FRIEND"
    ]
    array = array.concat(this.parseAdditionalInfoIntoArray(specialFriend.user.additionalInfo))
    return array;
  }

  displayAccount(account){
    if(account.role.roleName == "ADMIN"){
      this.sConnect.getAdminById(account.id).subscribe(
        (data:any) =>{
          this.openModal("#3232CD", "INFO" ,this.parseAdminIntoArray(data), false)
        },
        error =>{ console.log(error)}
      )
    }
    else if(account.role.roleName == "TEAM_MEMBER"){
      this.sConnect.getTeamMemberById(account.id).subscribe(
        (data:any) =>{
          this.openModal("#3232CD", "INFO" ,this.parseTeamMemberIntoArray(data), false)
        },
        error =>{ console.log(error)}
      )
    }
    else if(account.role.roleName == "VOLUNTEER"){
      this.sConnect.getVolunteerById(account.id).subscribe(
        (data:any) =>{
          console.log(data)
          this.openModal("#3232CD", "INFO" ,this.parseVolunteerIntoArray(data), false)
        },
        error =>{ console.log(error)}
      )
    }
  }



  displaySpecialFriend(specialFriend){
this.sConnect.getSpecialFriendById(specialFriend.id).subscribe(
        (data:any) =>{
          console.log(data)
          this.openModal("#3232CD", "INFO" ,this.parseSpecialFriendIntoArray(data), false)
        },
        error =>{ console.log(error)}
      )
  }
  deleteUser(user){
    if(user.role == undefined){
      this.sConnect.deleteSpecialFriendById(user.id).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.search(this.searchKey)
            this.openModal("#32CD32","SUCCESS",[data.message],false);
            
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split("."),false);
          }
        },
        error=>{
          console.log(error)
        }
      )
      
    }
    else if(user.role.roleName == "TEAM_MEMBER"){
      this.sConnect.deleteTeamMemberById(user.id).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.search(this.searchKey)
            this.openModal("#32CD32","SUCCESS",[data.message],false);
            
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split("."),false);
          }
        },
        error=>{
          console.log(error)
        }
      )
    }
    else if(user.role.roleName == "VOLUNTEER"){
      this.sConnect.deleteVolunteerById(user.id).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.search(this.searchKey)
            this.openModal("#32CD32","SUCCESS",[data.message],false);
            
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split("."),false);
          }
        },
        error=>{
          console.log(error)
        }
      )
    }
    else if(user.role.roleName == "ADMIN"){
      this.sConnect.deleteAdminById(user.id).subscribe(
        (data:any)=>{
          if(data.status == 200){
            this.search(this.searchKey)
            this.openModal("#32CD32","SUCCESS",[data.message],false);
            
          }
          else{
            this.openModal("#CD3232","ERROR",data.message.split("."),false);
          }
        },
        error=>{
          console.log(error)
        }
      )
    }
  }

  isItemEditable(item){
    console.log(item)
    console.log(this.editableRoles)
    for(let i = 0; i < this.editableRoles.length;i++){
      
      if (this.editableRoles[i].id == item.role.id){
        return true
      }
    }
      return false
  }

  search(searchKey){
    console.log("searhcing: "+  searchKey)
    let authHeader = new HttpHeaders().set('Authorization',  'Bearer ' + this.jwt);
    this.sConnect.getEditableRoles(authHeader).subscribe(
      data =>{this.editableRoles = data},
      error =>{
        if(error.status == 403){
          this.sConnect.updateJWT("");
        }
      }
    )
    this.sConnect.getPISearchInfo(searchKey).subscribe(
      (data:any) =>{
        console.log(data);
        this.searchResults = data;
      },
      error=>{

      }
    )
  }

}
