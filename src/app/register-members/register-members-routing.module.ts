import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterMembersPage } from './register-members.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterMembersPageRoutingModule {}
