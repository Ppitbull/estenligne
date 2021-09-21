import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiscussInfosComponent } from './user-discuss-infos.component';

describe('UserDiscussInfosComponent', () => {
  let component: UserDiscussInfosComponent;
  let fixture: ComponentFixture<UserDiscussInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDiscussInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiscussInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
