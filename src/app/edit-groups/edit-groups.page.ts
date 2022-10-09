import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { EmailGroup } from '../../assets/interfaces/emailGroup'
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.page.html',
  styleUrls: ['./edit-groups.page.scss'],
})
export class EditGroupsPage implements OnInit, ViewWillEnter {

  constructor(private sConnect: SpringConnectService) { }

  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  isConfirmModal: boolean = false;
  isDeleteConfirmModal: boolean = false;
  jwt: string;
  searchKey: string;
  searchResults: any = [];
  bannerInfo: string;
  emailList: any;
  prevResult: any;
  page: number = 0;

  curItem: EmailGroup = {
    id: 0,
    description: "",
    name: "",
    roles: [],
    SFNAccounts: [],
    specialFriends: [],
  };
  pageMax: number = 100000;
  roles: any = [];

  refreshData(){
    this.sConnect.jwtObs.subscribe(data => { this.jwt = data });
    this.sConnect.getEmailGroupByPage(this.page).subscribe(
      data => { this.emailList = data;  },
      error => {
        console.log(error);
        this.bannerInfo = "Error 504: Can't find Database!"
      }
    )
    this.sConnect.getAllRoles().subscribe(
      data => { this.roles = data;  },
      error => {
        console.log(error);
        this.bannerInfo = "Error 504: Can't find Database!"
      }
    )
  }
  ionViewWillEnter(): void {
    this.refreshData();
  }
  ngOnInit() {
    this.refreshData();
  }

  pickGroup(group) {
    this.curItem = JSON.parse(JSON.stringify(group));
    for (let i = 0; i < this.curItem.roles.length; i++) {
     
        document.getElementById(this.curItem.roles[i].id).ariaChecked = "true";

      }

    
   

  }

  openModal(color, header, body, isConfirmModal, isDeleteConfirmModal){
    console.log("open");
    let modal = document.getElementById('modal'); //show our modal
    this.modalBody = body;
    this.modalColor = color;
    this.modalHeader = header;
    this.isConfirmModal = isConfirmModal;
    this.isDeleteConfirmModal = isDeleteConfirmModal

  }

  closeModal(){
    let modal = document.getElementById('modal');
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
    this.isConfirmModal = false;
    this.isDeleteConfirmModal = false;
  }

  incPage() {
    if (this.page < this.pageMax) {
      this.page++;
      this.sConnect.getEmailGroupByPage(this.page).subscribe(
        (data: any) => {
          if (data.length < 5 && data.length > 0) {
            //this.sfPage++;
            this.pageMax = this.page
            this.emailList = data;
          }
          else if (data.length == 0) {

            this.pageMax = this.page
            this.page--;
            this.incPage()
          }
          else {

            this.emailList = data;
          }
          
        },
        error => {
          console.log(error);
          this.bannerInfo = "Error 504: Can't find Database!"
        }
      )
    }
  }

  decPage() {
    if (this.page > 0) {
      this.page--;
      this.sConnect.getEmailGroupByPage(this.page).subscribe(
        (data: any) => {
          this.emailList = data;
         
        },
        error => {
          console.log(error);
          this.bannerInfo = "Error 504: Can't find Database!"
        }
      )
    }
  }

  toggleUser(user) {
    document.getElementById(user.id + user.personalInfo.name).classList.toggle('striker');
  }

  triggerConfirmModal(){
    this.openModal("#ffa550", "Confirm?", ["Save Changes?"], true, false)
  }

  update() {
    let tempItem = this.compileCurrentGroup(this.curItem)
    this.sConnect.testPut(tempItem).subscribe(
      (data:any) => {
        console.log(data)
        if(data.status == 200){
         this.resetCurItem();
          this.openModal("#32CD32", "Confirm!", ["Changes have been successfully saved!"], false, false)
          //update our email groups
          this.sConnect.getEmailGroupByPage(this.page).subscribe(
            (data: any) => {
              this.emailList = data;
            },
            error => {
              console.log(error);
              this.bannerInfo = "Error 504: Can't find Database!"
            }
          )
        }
        else{
          //add a Data not saved prompt at the top
          data.message = "Data not saved." + data.message;
          //data returns seperated by periods "."
          //split at the period into different strings
          this.openModal("#CD3232", "Error", data.message.split("."), false, false)
        }
        
      },
      error => {
        console.log(error);
        this.bannerInfo = "Error 504: Can't find Database!"
      }
    )
   
  }

  compileCurrentGroup(item){
    //Compile sfn accounts into simpler data structure
    let newSFNAcc = [];
    let newSpecialFriends = [];
    //go through sfn accounts
    for(let i = 0; i < item.SFNAccounts.length;i++){
      let user = item.SFNAccounts[i];
      //if the user is not striked out
        if(!document.getElementById(user.id + user.personalInfo.name).classList.contains('striker')){
          //add ONLY their id to the new SFNAccount list
          newSFNAcc.push(JSON.parse('{"id":' + user.id + '}'));
        }
    }
    //go through specialFriends
    for(let i = 0; i < item.specialFriends.length;i++){
      let user = item.specialFriends[i];
      //if the user is striked out
        if(!document.getElementById(user.id + user.personalInfo.name).classList.contains('striker')){
          //take them out of the specialFriendsList
          newSpecialFriends.push(JSON.parse('{"id":' + user.id + '}'));
        }
    }
    //create a clone of the current item and return it
    let tempItem: EmailGroup = {
      id: item.id,
      description: item.description,
      name: item.name,
      roles: item.roles,
      SFNAccounts: newSFNAcc,
      specialFriends: newSpecialFriends,
    };
    return tempItem;
  }

  isUserInList(user, list) {

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == user.id) {
        return true;
      }
    }
  }

  addUserToList(user, list) {
    
    list.push(user);
    let item = document.getElementById(user.personalInfo.name + user.id);
    item.parentNode.removeChild(item)

  }

  isRoleInCurItem(role) {
    for (let i = 0; i < this.curItem.roles.length; i++) {
      if (this.curItem.roles[i].id == role.id) {
       
        return true;
      }
    }
    
    return false;
  }

  toggleRole(role) {
    for (let i = 0; i < this.curItem.roles.length; i++) {
      if (this.curItem.roles[i].id == role.id) {
        this.curItem.roles.splice(i, 1)
        let tempRole = JSON.parse(JSON.stringify(this.curItem.roles));
        this.curItem.roles = [];
        this.curItem.roles = tempRole;
        //document.getElementById(role.id).ariaChecked = "checked";
        return;
      }
    }
  
    this.curItem.roles.push(role);
    let tempRole = JSON.parse(JSON.stringify(this.curItem.roles));
        this.curItem.roles = [];
        this.curItem.roles = tempRole;

    
  }


  search() {
   
    this.sConnect.getPISearchInfo(this.searchKey).subscribe(
      (data:any) => { 
        //if there is a message, display it
        if(data.message != undefined){
          this.bannerInfo = data.message
        }
        //otherwise data able to be read, show it as searchResults
        else{
          this.searchResults = data
        }
        },
      error =>{
        console.log(error)
        this.bannerInfo = "Error 504: Can't find Database!"
      }
    )
  }

  promptDeleteConfirmation(){
    this.openModal("#ffa550", "Delete?", ["Are you really sure you want to delete?"], false, true)
  }
  delete(){
    this.sConnect.deleteGroupById(this.curItem.id).subscribe(
      (data:any) => {
        this.openModal("#32CD32", "Deleted Successfully", ["" + data.message], false, false)
        this.sConnect.getEmailGroupByPage(this.page).subscribe(
          (data: any) => {
            this.emailList = data;
            this.curItem = {
              id: 0,
              description: "",
              name: "",
              roles: [],
              SFNAccounts: [],
              specialFriends: [],
            };
          }
        )
      },
      error =>{
        console.log(error);
        this.bannerInfo = "Error 504: Can't find Database!"
      }
    )
  }

  resetCurItem(){
    this.curItem = {
      id: 0,
      description: "",
      name: "",
      roles: [],
      SFNAccounts: [],
      specialFriends: [],
    };
  }

}
