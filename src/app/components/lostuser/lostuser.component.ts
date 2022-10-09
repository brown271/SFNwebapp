import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lostuser',
  templateUrl: './lostuser.component.html',
  styleUrls: ['./lostuser.component.scss'],
})
export class LostuserComponent implements OnInit {

  @Input() jwt: string;
  constructor() { }

  ngOnInit() {}

}
