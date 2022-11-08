import { Component, OnInit } from '@angular/core';
import { SpringConnectService } from '../spring-connect.service';
import { EventserviceService } from '../eventservice.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.page.html',
  styleUrls: ['./create-events.page.scss'],
})
export class CreateEventsPage implements OnInit,ViewWillEnter {
  jwt: string;
  bannerInfo: string;
  formData: any;
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  isConfirmModal: boolean;
  isDeleteConfirmModal: boolean

  constructor(private sConnect: SpringConnectService, private eventService: EventserviceService) { }
//
ionViewWillEnter(): void {
  this.refreshData();
}
ngOnInit() {
  this.refreshData();
}

openModal(color, header, body, isConfirmModal, isDeleteConfirmModal){
  console.log("open");
  let modal = document.getElementById('modal'); //show our modal
  this.modalBody = body;
  this.modalColor = color;
  this.modalHeader = header;
  this.isConfirmModal = isConfirmModal
  this.isDeleteConfirmModal = isDeleteConfirmModal
  document.getElementById("mainForm").classList.toggle("myopia");

}

closeModal(){
  let modal = document.getElementById('modal');
  this.modalBody = [];
  this.modalColor = "#ffa550";
  this.modalHeader = "nomodal?";
  this.isConfirmModal = false
  this.isDeleteConfirmModal = false
  document.getElementById("mainForm").classList.toggle("myopia");
}

swapType(){
  console.log(this.formData.isOnline)
  this.formData.isOnline = !this.formData.isOnline;
  console.log(this.formData.isOnline)
}

createEvent(){
  this.sConnect.addEvent(this.formData).subscribe(
    (data:any) =>{
      if (data.status == 200){
        this.eventService.makeNewEmptyForm()
        this.openModal("#32CD32","SUCCESS",[data.message], false, false)
      }
      else{
        this.openModal("#CD3232","ERROR",data.message.split("."), false, false)
      }
    },
    error =>{
      this.bannerInfo = "ERROR 503: Can't access Database";
    }
  )
}

clearData(){
  this.eventService.makeNewEmptyForm();
}

saveChanges(){
  this.sConnect.updateEvent(this.formData).subscribe(
    (data:any) =>{
      if (data.status == 200){
        this.eventService.makeNewEmptyForm()
        this.openModal("#32CD32","SUCCESS",[data.message], false, false)
      }
      else{
        this.openModal("#CD3232","ERROR",data.message.split("."), false, false)
      }
    },
    error =>{
      this.bannerInfo = "ERROR 503: Can't access Database";
    }
  )
}

delete(){
  this.sConnect.deleteEventById(this.formData.id).subscribe(
    (data:any) =>{
      if (data.status == 200){
        this.eventService.makeNewEmptyForm()
        this.openModal("#32CD32","SUCCESS",[data.message], false, false)
      }
      else{
        this.openModal("#CD3232","ERROR",data.message.split("."), false, false)
      }
    },
    error =>{
      this.bannerInfo = "ERROR 503: Can't access Database";
    }
  )
}


refreshData(){
  this.sConnect.jwtObs.subscribe(data => { this.jwt = data });
  this.eventService.eventFormData.subscribe(data =>{this.formData = data})
  this.sConnect.checkForJWTCookie();
  this.bannerInfo = "";
    if(document.getElementById("mainForm") != undefined){
      if(document.getElementById("mainForm").classList.contains("myopia")){
        document.getElementById("mainForm").classList.toggle("myopia")
      }
    }
}

openConfirm(){
  this.openModal("#ffa550", "Confirm?", ["Save Changes?"], true, false)
}

openDeleteConfirm(){
  this.openModal("#ffa550", "Confirm?", ["Delete?", "This action can't be undone."], false, true)
}

}
