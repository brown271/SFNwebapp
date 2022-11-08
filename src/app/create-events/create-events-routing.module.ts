import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEventsPage } from './create-events.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEventsPageRoutingModule {}
