import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ErrorBannerComponent } from './error-banner/error-banner.component';


@NgModule({
  declarations: [HeaderComponent,FooterComponent, ErrorBannerComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],exports:[
    HeaderComponent, FooterComponent,ErrorBannerComponent
  ]
})
export class ComponentsModule { }
