import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendEmailsPageRoutingModule } from './send-emails-routing.module';

import { SendEmailsPage } from './send-emails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendEmailsPageRoutingModule
  ],
  declarations: [SendEmailsPage]
})
export class SendEmailsPageModule {}
