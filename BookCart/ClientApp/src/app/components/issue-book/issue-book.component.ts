import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";
import {SubscriptionService} from "../../services/subscription.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.scss']
})
export class IssueBookComponent implements OnInit {

  public books: Book[];
  public filteredProducts: Book[];
  category: string;
  priceRange = Number.MAX_SAFE_INTEGER;
  isLoading: boolean;
  searchItem: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getAllBookData();
  }

  getAllBookData() {
    this.bookService.books$.pipe(switchMap(
      (data: Book[]) => {
        this.filteredProducts = data;
        return this.route.queryParams;
      }
    )).subscribe(params => {
      this.category = params.category;
      this.searchItem = params.item;
      this.subscriptionService.searchItemValue$.next(this.searchItem);
      this.filterBookData();
    });
  }

  filterPrice(value: number) {
    this.priceRange = value;
    this.filterBookData();
  }

  filterBookData() {
    const filteredData = this.filteredProducts.filter(b => b.price <= this.priceRange).slice();

    if (this.category) {
      this.books = filteredData.filter(b => b.category.toLowerCase() === this.category.toLowerCase() &&
        b.isActive === true && b.toBoook === true);
    } else if (this.searchItem) {
      this.books = filteredData.filter(b => (b.title.toLowerCase().indexOf(this.searchItem) !== -1
        || b.author.toLowerCase().indexOf(this.searchItem) !== -1) && b.isActive === true && b.toBoook === true);
    } else {
      this.books = filteredData.filter(b => b.isActive === true && b.toBoook === true);
    }
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscriptionService.searchItemValue$.next('');
  }

}
