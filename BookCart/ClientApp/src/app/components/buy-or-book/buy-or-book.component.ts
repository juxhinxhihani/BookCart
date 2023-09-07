import { Component, OnInit } from '@angular/core';
import {Card} from "../../models/card";

@Component({
  selector: 'app-buy-or-book',
  templateUrl: './buy-or-book.component.html',
  styleUrls: ['./buy-or-book.component.scss']
})
export class BuyOrBookComponent implements OnInit {

  constructor() { }
  public card = new Card();
  home = "/home";
  issued = "/issued-book";
  ngOnInit(): void {
    this.card.content = "Huazo nje liber nga biblioteka  shkolles per nje periudhe afatshkurter!";
    this.card.title = "Huazo";
    this.card.imageUrl = "https://thumbs.dreamstime.com/b/sorry-fully-booked-note-paper-white-background-216862963.jpg"
    this.card.buttons = ['read more'];

  }

}
