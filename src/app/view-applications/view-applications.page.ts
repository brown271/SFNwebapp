import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { SpringConnectService } from '../spring-connect.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.page.html',
  styleUrls: ['./view-applications.page.scss'],
})
export class ViewApplicationsPage implements OnInit , ViewWillEnter{

  constructor(private sConnect: SpringConnectService) { }
  modalColor:string;
  modalHeader:string;
  modalBody:any = [];
  errorMsg:string;
  jwt:string;
  applications:any = [];
  isStackedModal: boolean = true;

  refreshData(){
    this.sConnect.jwtObs.subscribe(data => {this.jwt = data});
    this.sConnect.checkForJWTCookie();
    this.errorMsg = ""
    this.sConnect.getAllApplications().subscribe(
      (data:any) =>{
        console.log("yuh")
        console.log(data);
        this.applications = data.applications;
      },
      error => {
        this.errorMsg = "ERROR 503: Can't access database!"
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

  accept(item){
    this.sConnect.acceptApplicationById(item.id).subscribe(
      (data:any) =>{
        if(data.status == 200){
          this.openModal("#32CD32","SUCCESS",[data.message], false)
          this.sConnect.getAllApplications().subscribe(
            (data:any) =>{
              console.log("yuh")
              console.log(data);
              this.applications = data.applications;
            },
            error => {
              this.errorMsg = "ERROR 503: Can't access database!"
            }
          )
        }
        else{
          this.openModal("#CD3232","ERROR",[data.message], false)
        }
        
      },
      error =>{

      }
    )
  }

  deny(item){
    this.sConnect.deleteApplicationById(item.id).subscribe(
      (data:any) =>{
        if(data.status == 200){
          this.openModal("#32CD32","SUCCESS",[data.message], false)
          this.sConnect.getAllApplications().subscribe(
            (data:any) =>{
              console.log("yuh")
              console.log(data);
              this.applications = data.applications;
            },
            error => {
              this.errorMsg = "ERROR 503: Can't access database!"
            }
          )
        }
        else{
          this.openModal("#CD3232","ERROR",[data.message], false)
        }
        
      },
      error =>{

      }
    )
  }

  moreInfo(item){
    this.sConnect.findApplicationById(item.id).subscribe(
      (data:any) =>{
        let array = this.parseApplicationIntoArray(data.user);
        this.openModal("#3232CD","APPLICANT INFO",array, true)
      },
      error =>{

      }
    )
  }

  parseApplicationIntoArray(application){
    console.log(application)
    let personalInfo = application.personalInfo;
    let additionalInfo = application.additionalInfo;
    let array = [
      "Name: " + personalInfo.firstName + " " + personalInfo.lastName
    ]
    array.push("Email: " + personalInfo.email)
    array.push("Phone Number: " + personalInfo.phoneNumber)
    array.push("Birthday: " + personalInfo.birthDay)
    if(application.howToComfort != undefined && application.howToComfort.length > 0)
    array.push("How to comfort: " + application.howToComfort )
    if(application.isCostAFactor )
    array.push("Cost is a large factor")
    else
    array.push("Cost is not a large factor")
    if(application.isBirthdayClubMember )
    array.push("Part of Birthday Club")
    else
    array.push("Not a part of Birthday Club")
   if(additionalInfo.allergies != undefined && additionalInfo.allergies.length > 0)
    array.push("Allergies: " + additionalInfo.allergies)
    if(additionalInfo.specialNeeds != undefined && additionalInfo.specialNeeds.length > 0)
    array.push("Special Needs: " + additionalInfo.specialNeeds)
  return array;
  }

  openModal(color, header, body, isStackedModal){
    console.log("open");
    let modal = document.getElementById('modal'); //show our modal
    this.modalBody = body;
    this.modalColor = color;
    this.modalHeader = header;
    this.isStackedModal = isStackedModal
    document.getElementById("mainForm").classList.toggle("myopia");

  }

  closeModal(){
    let modal = document.getElementById('modal');
    this.modalBody = [];
    this.modalColor = "#ffa550";
    this.modalHeader = "nomodal?";
    this.isStackedModal = false
    document.getElementById("mainForm").classList.toggle("myopia");
  }

}
