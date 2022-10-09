import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
})
export class AdditionalInfoComponent implements OnInit {

  @Input() additionalInfoInput: any


  constructor() { }

  ngOnInit() {}


}
