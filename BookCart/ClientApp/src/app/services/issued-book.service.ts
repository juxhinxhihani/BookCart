import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class IssuedBookService {

  baseURL: string;
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/IssuedBook';
  }

  addBook(book: IssuedBookService) {
    return this.http.post<IssuedBookService>(this.baseURL , JSON.stringify(book), {headers: this.ACCEPT_TYPE_HEADER});
  }
}
