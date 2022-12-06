import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  routeFB(){
    window.open("https://www.facebook.com/TheSpecialFriendsNetwork/");
  }

  routeInsta(){
    window.open("https://www.instagram.com/specialfriendsnetwork/?hl=en");
  }

  routeEmail(){
    window.open("mailto:specialfriendsnetworkaddress@hotmail.com");
  }

}
