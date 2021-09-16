import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLoaderComponent } from './popup-loader.component';

describe('PopupLoaderComponent', () => {
  let component: PopupLoaderComponent;
  let fixture: ComponentFixture<PopupLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
