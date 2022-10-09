import { Component, OnInit } from '@angular/core';
import {  Input } from '@angular/core';
import { SpringConnectService } from 'src/app/spring-connect.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  @Input() accountFormInput: any


  constructor(private sConnect: SpringConnectService) { }

  ngOnInit() {
  }

  updatePersonalInfo(personalInfo){
    this.accountFormInput.personalInfo = personalInfo
  }

 

}
