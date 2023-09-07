import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrBookComponent } from './buy-or-book.component';

describe('BuyOrBookComponent', () => {
  let component: BuyOrBookComponent;
  let fixture: ComponentFixture<BuyOrBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyOrBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
