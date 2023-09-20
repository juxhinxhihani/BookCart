import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-issued-book-list',
  templateUrl: './issued-book-list.component.html',
  styleUrls: ['./issued-book-list.component.scss'],
  providers: [DatePipe]
})
export class IssuedBookListComponent implements OnInit {

  displayedColumns: string[] = ['issueId', 'bookTitle', 'startDate', 'endDate', 'phoneNumber', 'operation'];
  userID;
  dataSource = new MatTableDataSource<IssuedBook>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private bookService: IssuedBookService,
    private datePipe : DatePipe,
    public dialog: MatDialog,
    private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.userID = parseInt(localStorage.getItem('userId'));
    this.getAllBookData(this.userID);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getAllBookData(userID) {
    this.bookService.getReserveBooks(userID)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IssuedBook[]) => {
        // data.forEach( x=> x.startDate = this.datePipe.transform((x.startDate, "dd.MM.yyyy'")))
        this.dataSource.data = Object.values(data);
      }, error => {
        console.log('Error ocurred while fetching book details : ', error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: id
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result === 1) {
          this.getAllBookData(this.userID);
          this.snackBarService.showSnackBar('Data deleted successfully');
        } else {
          this.snackBarService.showSnackBar('Error occurred!! Try again');
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
