import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SpecialFriendFormComponent } from './special-friend-form.component';

describe('SpecialFriendFormComponent', () => {
  let component: SpecialFriendFormComponent;
  let fixture: ComponentFixture<SpecialFriendFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialFriendFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialFriendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
