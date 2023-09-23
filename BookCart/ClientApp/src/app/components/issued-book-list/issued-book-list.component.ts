import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../../models/book";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {pipe, Subject} from "rxjs";
import {BookService} from "../../services/book.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {takeUntil} from "rxjs/operators";
import {DeleteBookComponent} from "../admin/delete-book/delete-book.component";
import {IssuedBook} from "../../models/issuedBook";
import {IssuedBookService} from "../../services/issued-book.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

class id {
}

@Component({
  selector: 'app-issued-book-list',
  templateUrl: './issued-book-list.component.html',
  styleUrls: ['./issued-book-list.component.scss'],
  providers: [DatePipe]
})
export class IssuedBookListComponent implements OnInit {

  @Input()
  childId: number;

  displayedColumns: string[] = ['issueId', 'bookTitle', 'startDate', 'endDate', 'phoneNumber', 'operation'];
  displayedColumns2: string[] = ['issueId', 'bookTitle','startDate', 'returnDate'];

  userID;
  dataSource = new MatTableDataSource<IssuedBook>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private bookService: IssuedBookService,
    private datePipe : DatePipe,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.userID = parseInt(localStorage.getItem('userId'));
    this.getAllBookData(this.userID);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getAllBookData(userID) {
    if(this.childId == 1) {
      this.bookService.getReserveBooks(userID)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: IssuedBook[]) => {
          // data.forEach( x=> x.startDate = this.datePipe.transform((x.startDate, "dd.MM.yyyy'")))
          console.log(data);

          this.dataSource.data = Object.values(data);
        }, error => {
          console.log('Error ocurred while fetching book details : ', error);
        });
    }
    else{
      this.bookService.getReturnBooks(userID)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: IssuedBook[]) => {
          // data.forEach( x=> x.startDate = this.datePipe.transform((x.startDate, "dd.MM.yyyy'")))
          this.dataSource.data = Object.values(data);
        }, error => {
          console.log('Error ocurred while fetching book details : ', error);
        });
    }
  }
  getdatetime(){
    // return this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
    return this.datePipe.transform(new Date(), 'dd/MM/yyyy')
  }
  compareDates(element): boolean {

    return element.endDate > this.datePipe.transform(new Date(), "yyyy-MM-dd'T'hh:mm.ss.sss");
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  return(id: number) {
    this.bookService.openConfirmDialog('Are you sure you want to return it?')
      .afterClosed().subscribe((res => {
      if (res) {
        this.bookService.return(id).subscribe((result) => {

          this._snackBar.open('Succesfully returned', 'Close', {
            duration: 3000,
            verticalPosition: "bottom"
          });
          this.ngOnInit();
        });
        setTimeout(() => window.location.reload(), 1000)
      }

    }))

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected readonly Date = Date;
}
