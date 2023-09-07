import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthGuard } from './guards/auth.guard';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import {BuyOrBookComponent} from "./components/buy-or-book/buy-or-book.component";
import {IssueBookComponent} from "./components/issue-book/issue-book.component";

const appRoutes: Routes = [
  { path: '', component: BuyOrBookComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'issued-book', component: IssueBookComponent},
  { path: 'filter', component: HomeComponent },
  { path: 'search', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'books/details/:id', component: BookDetailsComponent },
  { path: 'shopping-cart', component: ShoppingcartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/books',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [AdminAuthGuard],
    canActivate: [AdminAuthGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' }),
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
