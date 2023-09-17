import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-similarbooks',
  templateUrl: './similarbooks.component.html',
  styleUrls: ['./similarbooks.component.scss']
})
export class SimilarbooksComponent implements OnInit {

  @Input()
  bookId: number;
  @Input()
  bookType: boolean;
  private subject = new Subject<any>();

  SimilarBook$: Observable<Book[]>;
  SimilarBookRes$: Observable<Book[]>;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.bookId = +params.id;
        this.getSimilarBookData();
        this.SimilarBookRes$ = this.getData();
      }
    );
  }

  getSimilarBookData() {
    this.SimilarBook$ = this.bookService.getsimilarBooks(this.bookId);
  }
  getData(){
    this.SimilarBook$.subscribe( res => {
      this.subject.next(res.filter(x => x.toBoook == this.bookType));
    })
    return this.subject.asObservable();
  }
}
