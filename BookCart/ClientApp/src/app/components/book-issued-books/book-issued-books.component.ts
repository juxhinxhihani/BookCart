import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {SnackbarService} from "../../services/snackbar.service";
import {SubscriptionService} from "../../services/subscription.service";

@Component({
  selector: 'app-book-issued-books',
  templateUrl: './book-issued-books.component.html',
  styleUrls: ['./book-issued-books.component.scss']
})
export class BookIssuedBooksComponent implements OnInit {

  @Input()
  bookId: number;

  userId;

  constructor(
    private cartService: CartService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');
  }

  fillBookForm() {
    this.cartService.addBookToCart(this.userId, this.bookId).subscribe(
      result => {
        this.subscriptionService.cartItemcount$.next(result);
        this.snackBarService.showSnackBar('One Item added to cart');
      }, error => {
        console.log('Error ocurred while addToCart data : ', error);
      });
  }

  ngOnInit(): void {
  }

}
