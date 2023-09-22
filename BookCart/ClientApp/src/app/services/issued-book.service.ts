import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/order";
import {Book} from "../models/book";
import {IssuedBook} from "../models/issuedBook";
import {PendingBooks} from "../models/pendingBooks";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class IssuedBookService {

  baseURL: string;
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient,
              private dialog: MatDialog) {
    this.baseURL = 'https://localhost:5001/api/IssuedBook';
  }

  addBook(book: IssuedBookService) {
    return this.http.post<IssuedBookService>(this.baseURL , JSON.stringify(book), {headers: this.ACCEPT_TYPE_HEADER});
  }
  getReserveBooks(userId: number){
    return this.http.get<IssuedBook[]>(this.baseURL + '/' + userId);
  }
  getReturnBooks(userId: number){
    return this.http.get<IssuedBook[]>(this.baseURL + '/return/' + userId);
  }
  getPendingBooks(){
    return this.http.get<PendingBooks[]>(this.baseURL + '/Pending');
  }
  return(userId: number){
    return this.http.put<PendingBooks[]>(this.baseURL + '/Return/'+ userId, null, {headers: this.ACCEPT_TYPE_HEADER});
  }
  approve(userId: number){
    return this.http.put<PendingBooks[]>(this.baseURL + '/Approve/'+ userId, null, {headers: this.ACCEPT_TYPE_HEADER});
  }
  openConfirmDialog(msg: string) {

    return this.dialog.open(ConfirmDialogComponent, {
      width: "390 px",
      disableClose: true,
      data: {
        message: msg
      }
    })
  }
}
