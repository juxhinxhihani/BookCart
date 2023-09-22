import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddtocartComponent } from './components/addtocart/addtocart.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { SimilarbooksComponent } from './components/similarbooks/similarbooks.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';

import { NgMaterialModule } from './ng-material/ng-material.module';
import { AppRoutingModule } from './app-routing.module';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { SearchComponent } from './components/search/search.component';
import { AddtowishlistComponent } from './components/addtowishlist/addtowishlist.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import {BuyOrBookComponent} from "./components/buy-or-book/buy-or-book.component";
import { IssueBookComponent } from './components/issue-book/issue-book.component';
import { BookIssuedBooksComponent } from './components/book-issued-books/book-issued-books.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { ReserveBookComponent } from './components/reserve-book/reserve-book.component';
import { IssuedBookListComponent } from './components/issued-book-list/issued-book-list.component';
import { PendingListComponent } from './components/pending-list/pending-list.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    AddtocartComponent,
    BookCardComponent,
    BookDetailsComponent,
    BookFilterComponent,
    CheckoutComponent,
    LoginComponent,
    MyOrdersComponent,
    UserRegistrationComponent,
    HomeComponent,
    NavBarComponent,
    ShoppingcartComponent,
    ThemePickerComponent,
    SimilarbooksComponent,
    PageNotFoundComponent,
    PriceFilterComponent,
    SearchComponent,
    AddtowishlistComponent,
    WishlistComponent,
    BuyOrBookComponent,
    IssueBookComponent,
    BookIssuedBooksComponent,
    BookFormComponent,
    ReserveBookComponent,
    IssuedBookListComponent,
    PendingListComponent,
    MyReservationsComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    NgMaterialModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
