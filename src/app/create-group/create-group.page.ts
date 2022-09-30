import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { EmailGroup } from 'src/assets/interfaces/emailGroup';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  bannerInfo:string;
  jwt:string;
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  page:number = 0;
  pageMax: number = 100000;
  sFriends:any;
  accounts:any;
  searchResults: any = [];
  roles:any = [];

  searchKey: string;
  curItem: EmailGroup = {
    id: null,
    description: "",
    name: "",
    roles: [],
    SFNAccounts: [],
    specialFriends: [],
  };
  constructor(private sConnect:SpringConnectService) { }

  ngOnInit() {
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
    //testConnection
    //if (this.jwt != null &&  this.jwt.length>0){
      this.sConnect.getAllRoles().subscribe(
        data =>{this.roles = data; console.log(data)},
        error => {
          this.bannerInfo = "Error 504: Can't find Database!"
        }
      )
    //}
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
    let item = document.getElementById(user.name + user.id);
    item.parentNode.removeChild(item)

  }

  createGroup() {
    let tempItem = this.validateSpecialFriendsAndAccounts(this.curItem)
    console.log("SENDING");
    console.log(tempItem);
    this.sConnect.addGroup(tempItem).subscribe(
      (data:any) => {
        console.log(data);
        if(data.message.length < 15){
          this.curItem = {
            id: 0,
            description: "",
            name: "",
            roles: [],
            SFNAccounts: [],
            specialFriends: [],
          };

          this.openModal("#32CD32", "Confirm!", ["Changes have been successfully saved!"], false, false)
          this.searchResults = [];
        }
        else{
          data.message = "Data not saved." + data.message;
          this.openModal("#CD3232", "Error", data.message.split("."), false, false)
        }
        
      },
      error => {
       
          this.bannerInfo = "Error 504: Can't find Database!"
       
       
      }
    )
   
  }

  validateSpecialFriendsAndAccounts(item){
    let newSFNAcc = [];
    for(let i = 0; i < item.SFNAccounts.length;i++){
      let user = item.SFNAccounts[i];
        if(!document.getElementById(user.id + user.name).classList.contains('striker')){
          console.log(user.name + " Does not contain a strikeout.")
          newSFNAcc.push(JSON.parse('{"id":' + user.id + '}'));
        }
    }
    for(let i = 0; i < item.specialFriends.length;i++){
      let user = item.specialFriends[i];
        if(document.getElementById(user.id + user.name).classList.contains('striker')){
          item.roles.specialFriends.split(i, 1)
        }
    }
    let tempItem: EmailGroup = {
      id: item.id,
      description: item.description,
      name: item.name,
      roles: item.roles,
      SFNAccounts: newSFNAcc,
      specialFriends: item.specialFriends,
    };
    return tempItem;
  }



  clearAllFields(){
this.curItem = {
  id: null,
  description: "",
  name: "",
  roles: [],
  SFNAccounts: [],
  specialFriends: [],
};
  }

  toggleUser(user) {
    document.getElementById(user.id + user.name).classList.toggle('striker');
  }

  search() {
   
    this.sConnect.getPISearchInfo(this.searchKey).subscribe(
      data => { this.searchResults = data;  }
    )
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

  isRoleInCurItem(role) {
   
    for (let i = 0; i < this.curItem.roles.length; i++) {
      if (this.curItem.roles[i].id == role.id) {
      
        return true;
      }
    }
   
    return false;
  }

  openModal(color, header, body, isConfirmModal, isDeleteConfirmModal){
    let modal = document.getElementById('modal'); //show our modal
    console.log("open");
    this.modalBody = body;
    this.modalColor = color;
    this.modalHeader = header;

  }

  closeModal(){
    let modal = document.getElementById('modal');
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
  }

  
  


}
