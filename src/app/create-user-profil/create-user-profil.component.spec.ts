import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserProfilComponent } from './create-user-profil.component';

describe('CreateUserProfilComponent', () => {
  let component: CreateUserProfilComponent;
  let fixture: ComponentFixture<CreateUserProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
