import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { EmailGroup } from '../../assets/interfaces/emailGroup'

@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.page.html',
  styleUrls: ['./edit-groups.page.scss'],
})
export class EditGroupsPage implements OnInit {

  constructor(private sConnect: SpringConnectService) { }

  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  isConfirmModal: boolean = false;
  jwt: string;
  searchKey: string;
  searchResults: any = [];
  bannerInfo: string;
  emailList: any;
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

  ngOnInit() {
    this.sConnect.jwtObs.subscribe(data => { this.jwt = data });
    this.sConnect.getEmailGroupByPage(this.page).subscribe(
      data => { this.emailList = data;  },
      error => {
        if (error.status == 504) {
          this.bannerInfo = "Error 504: Can't find Database!"
        }
        else {
          this.bannerInfo = "Error " + error.status
        }
      }
    )
    this.sConnect.getAllRoles().subscribe(
      data => { this.roles = data;  },
      error => console.log(error)
    )
  }

  pickGroup(group) {
    this.curItem = JSON.parse(JSON.stringify(group));
    for (let i = 0; i < this.curItem.roles.length; i++) {
      console.log("yuh" + this.curItem.roles[i].id)
        document.getElementById(this.curItem.roles[i].id).ariaChecked = "true";

      }
    
   

  }

  openModal(color, header, body, isConfirmModal){
    let modal = document.getElementById('modal'); //show our modal
    modal.style.display = "block";
    this.modalBody = body;
    this.modalColor = color;
    this.modalHeader = header;
    this.isConfirmModal = isConfirmModal;

  }

  closeModal(){
    let modal = document.getElementById('modal');
    modal.style.display = "none";
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
    this.isConfirmModal = false;
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
        error => console.log(error)
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
        error => console.log(error)
      )
    }
  }

  toggleUser(user) {
    document.getElementById(user.id + user.name).classList.toggle('striker');
  }

  triggerConfirmModal(){
    this.openModal("#ffa550", "Confirm?", ["Save Changes?"], true)
  }

  update() {
    let tempItem = this.validateSpecialFriendsAndAccounts(this.curItem)
    console.log("SENDING");
    console.log(tempItem);
    this.sConnect.testPut(tempItem).subscribe(
      (data:any) => {
        console.log(data);
        if(data.message.length < 15){
          this.openModal("#32CD32", "Confirm!", ["Changes have been successfully saved!"], false)
          this.sConnect.getEmailGroupByPage(this.page).subscribe(
            (data: any) => {
              this.emailList = data;
              
             
            },
            error => console.log(error)
          )
        }
        else{
          data.message = "Data not saved." + data.message;
          this.openModal("#CD3232", "Error", data.message.split("."), false)
        }
        
      },
      error => {
        console.log(error);
        
      }
    )
    this.curItem = {
      id: 0,
      description: "",
      name: "",
      roles: [],
      SFNAccounts: [],
      specialFriends: [],
    };
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
          item.roles.specialFriends(i, 1)
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

  isRoleInCurItem(role) {
    console.log("Checking if " + role.id + "is in List")
    console.log(this.curItem.roles)
    for (let i = 0; i < this.curItem.roles.length; i++) {
      if (this.curItem.roles[i].id == role.id) {
        console.log(role.id + "is in List")
        return true;
      }
    }
    console.log(role.id + "is not in List")
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
      data => { this.searchResults = data;  }
    )
  }

  delete(){

  }

}
