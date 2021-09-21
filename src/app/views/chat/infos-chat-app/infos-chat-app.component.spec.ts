import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosChatAppComponent } from './infos-chat-app.component';

describe('InfosChatAppComponent', () => {
  let component: InfosChatAppComponent;
  let fixture: ComponentFixture<InfosChatAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosChatAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosChatAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
