import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGroupMessageComponent } from './item-group-message.component';

describe('ItemGroupMessageComponent', () => {
  let component: ItemGroupMessageComponent;
  let fixture: ComponentFixture<ItemGroupMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGroupMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGroupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
