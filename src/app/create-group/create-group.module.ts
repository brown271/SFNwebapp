import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGroupPageRoutingModule } from './create-group-routing.module';

import { CreateGroupPage } from './create-group.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGroupPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateGroupPage]
})
export class CreateGroupPageModule {}
