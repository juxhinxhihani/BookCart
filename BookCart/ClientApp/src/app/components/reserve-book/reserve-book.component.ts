import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
              private datePipe : DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: {element: any}) {
                  this.userId = localStorage.getItem('userId');
              }

  reserveForm = new FormGroup({
    phoneNumber : new FormControl('', [Validators.required]),
    product_id : new FormControl('', [Validators.required]),
    user_id : new FormControl(parseInt(localStorage.getItem('userId')), [Validators.required]),
    startDate : new FormControl(this.datePipe.transform(new Date(), "yyyy-MM-dd'T'hh:mm"), [Validators.required]),
    endDate : new FormControl('s', [Validators.required]),
    returned : new FormControl(0, [Validators.required]),
    returnDate: new FormControl('', [Validators.required])
  });
  todaydate= "2023.02.13";
  ngOnInit(): void {
    console.log(this.data.element);
  }
  get phoneNumber() {
    return this.reserveForm.get('phoneNumber');
  }
  getDateTime(): string {
    return this.datePipe.transform(new Date(), "yyyy-MM-dd'T'hh:mm");
  }
  reserveBook() {
    if(this.reserveForm.valid) {
      this.reserveForm.value.startDate = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
      this.http.post<any>("https://localhost:5001/api/IssuedBook", this.reserveForm.value, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe({
        next:
          res => {

            // window.location.reload();
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
