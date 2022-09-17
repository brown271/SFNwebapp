import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGroupPage } from './create-group.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateGroupPageRoutingModule {}
