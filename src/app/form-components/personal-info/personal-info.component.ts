import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {

  @Input() personalInfoInput: any

  constructor() { }

  ngOnInit() {}


}
