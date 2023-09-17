import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {SnackbarService} from "../../services/snackbar.service";
import {SubscriptionService} from "../../services/subscription.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ReserveBookComponent} from "../reserve-book/reserve-book.component";

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
    private route: ActivatedRoute,
    private cartService: CartService,
    private router:Router,
    private dialog : MatDialog,
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

  reserveBook() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(ReserveBookComponent, {panelClass: 'full-width-dialog',  data : { element:
        this.bookId} }
    ).afterClosed().subscribe({next: value =>{
        if (value){
          this.ngOnInit();
        }
      }
    })
    var returnUrl = this.router.url;
    this.router.navigate([returnUrl])

  }

  ngOnInit(): void {
  }

}
