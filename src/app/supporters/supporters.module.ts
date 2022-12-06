import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportersPageRoutingModule } from './supporters-routing.module';

import { SupportersPage } from './supporters.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SupportersPage]
})
export class SupportersPageModule {}
