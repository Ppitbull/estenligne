import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserBarComponent } from './search-user-bar.component';

describe('SearchUserBarComponent', () => {
  let component: SearchUserBarComponent;
  let fixture: ComponentFixture<SearchUserBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUserBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
