import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEventsPageRoutingModule } from './create-events-routing.module';

import { CreateEventsPage } from './create-events.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEventsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateEventsPage]
})
export class CreateEventsPageModule {}
