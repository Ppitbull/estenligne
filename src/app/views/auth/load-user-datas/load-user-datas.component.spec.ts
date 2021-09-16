import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadUserDatasComponent } from './load-user-datas.component';

describe('LoadUserDatasComponent', () => {
  let component: LoadUserDatasComponent;
  let fixture: ComponentFixture<LoadUserDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadUserDatasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadUserDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
