import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { SpecialFriendFormComponent } from './special-friend-form/special-friend-form.component';
import { AccountComponent } from './account/account.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PersonalInfoComponent,AccountComponent,SpecialFriendFormComponent,AdditionalInfoComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports:[
    PersonalInfoComponent,AccountComponent,SpecialFriendFormComponent,AdditionalInfoComponent
  ]
})
export class FormComponentsModule { }
