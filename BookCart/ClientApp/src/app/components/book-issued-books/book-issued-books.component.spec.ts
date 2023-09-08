import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIssuedBooksComponent } from './book-issued-books.component';

describe('BookIssuedBooksComponent', () => {
  let component: BookIssuedBooksComponent;
  let fixture: ComponentFixture<BookIssuedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookIssuedBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookIssuedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
