import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterMembersPageRoutingModule } from './register-members-routing.module';

import { RegisterMembersPage } from './register-members.page';
import { ComponentsModule } from '../components/components.module';
import { FormComponentsModule } from '../form-components/form-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterMembersPageRoutingModule, ComponentsModule,FormComponentsModule
  ],
  declarations: [RegisterMembersPage]
})
export class RegisterMembersPageModule {}
