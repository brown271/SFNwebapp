import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchEventsPage } from './search-events.page';

const routes: Routes = [
  {
    path: '',
    component: SearchEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchEventsPageRoutingModule {}
