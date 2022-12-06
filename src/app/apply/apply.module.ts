import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyPageRoutingModule } from './apply-routing.module';

import { ApplyPage } from './apply.page';
import { ComponentsModule } from '../components/components.module';
import { FormComponentsModule } from '../form-components/form-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyPageRoutingModule,
    ComponentsModule,
    FormComponentsModule
  ],
  declarations: [ApplyPage]
})
export class ApplyPageModule {}
