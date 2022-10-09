import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ComponentsModule } from '../components/components.module';
import { FormComponentsModule } from '../form-components/form-components.module';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    FormComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
