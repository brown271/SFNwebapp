import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewApplicationsPage } from './view-applications.page';

const routes: Routes = [
  {
    path: '',
    component: ViewApplicationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewApplicationsPageRoutingModule {}
