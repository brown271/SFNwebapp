import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGroupsPage } from './edit-groups.page';

const routes: Routes = [
  {
    path: '',
    component: EditGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGroupsPageRoutingModule {}
