import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendEmailsPage } from './send-emails.page';

const routes: Routes = [
  {
    path: '',
    component: SendEmailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendEmailsPageRoutingModule {}
