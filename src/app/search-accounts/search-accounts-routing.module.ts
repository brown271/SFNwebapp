import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SearchAccountsPage } from './search-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: SearchAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchAccountsPageRoutingModule {}
