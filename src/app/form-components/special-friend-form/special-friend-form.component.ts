import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-special-friend-form',
  templateUrl: './special-friend-form.component.html',
  styleUrls: ['./special-friend-form.component.scss'],
})
export class SpecialFriendFormComponent implements OnInit {

  @Input() specialFriendInput: any

  constructor() { }

  ngOnInit() {}
  
}
