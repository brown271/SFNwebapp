import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewApplicationsPageRoutingModule } from './view-applications-routing.module';

import { ViewApplicationsPage } from './view-applications.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewApplicationsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewApplicationsPage]
})
export class ViewApplicationsPageModule {}
