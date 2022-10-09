import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchAccountsPageRoutingModule } from './search-accounts-routing.module';

import { SearchAccountsPage } from './search-accounts.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchAccountsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchAccountsPage]
})
export class SearchAccountsPageModule {}
