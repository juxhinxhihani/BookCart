import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IssuedBookService} from "../../services/issued-book.service";

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.scss'],
  providers: [DatePipe]
})
export class ReserveBookComponent implements OnInit {

  private role: string;
  userId;

  constructor(
              private http : HttpClient,
              private router : Router,
              private _snackBar: MatSnackBar,
              private issuedService: IssuedBookService,
              private datePipe : DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: {element: any}) {
                  this.userId = localStorage.getItem('userId');
              }

  reserveForm = new FormGroup({
    phoneNumber : new FormControl('', [Validators.required, Validators.pattern("^(00355|\\+355|0)[0-9]{9}$")]),
    product_id : new FormControl(0),
    user_id : new FormControl(parseInt(localStorage.getItem('userId'))),
    startDate : new FormControl(this.getDateTime()),
    endDate : new FormControl('s'),
    returned : new FormControl(0),
  });
  todaydate= "2023.02.13";
  ngOnInit(): void {
    console.log(this.data.element);
  }
  get phoneNumber() {
    return this.reserveForm.get('phoneNumber');
  }
  get endDate() {
    return this.reserveForm.get('endDate');
  }
  getDateTime(): string {
    return this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }
  reserveBook() {
    this.reserveForm.value.returned = 0;
    this.reserveForm.value.startDate = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
    this.reserveForm.value.endDate = this.datePipe.transform(this.reserveForm.value.endDate, "yyyy-MM-dd'T'HH:mm:ss.sss");
    this.reserveForm.value.product_id = this.data.element;
    this.reserveForm.value.user_id = parseInt(localStorage.getItem('userId'));
    console.log(this.reserveForm.value);
    if(this.reserveForm.valid) {
      this.issuedService.addBook(this.reserveForm.value).subscribe({
        next:
          res => {
          if (res){
            this._snackBar.open('Succesfully added', 'Close', {
              duration: 3000,
              verticalPosition: "bottom"
            });

          }
          window.location.reload();
          }, error:
          err => {
            this._snackBar.open('Something went wrong', 'Close', {
              duration: 3000,
              verticalPosition: "bottom"
            });
          }
      })

    }
    else {
      this._snackBar.open('Invalid Form', 'Close', {
        duration: 3000,
        verticalPosition: "bottom"
      });
    }

  }
}
