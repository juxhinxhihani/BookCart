import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IssuedBook} from "../../models/issuedBook";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {IssuedBookService} from "../../services/issued-book.service";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {takeUntil} from "rxjs/operators";
import {DeleteBookComponent} from "../admin/delete-book/delete-book.component";
import {PendingBooks} from "../../models/pendingBooks";

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss'],
  providers: [DatePipe]
})
export class PendingListComponent implements OnInit {

  displayedColumns: string[] = ['issueId', 'firstName', 'book', 'author', 'phoneNumber','returnDate','Approve'];
  dataSource = new MatTableDataSource<PendingBooks>();

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
    this.getAllBookData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getAllBookData() {
    this.bookService.getPendingBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: PendingBooks[]) => {
        // data.forEach( x=> x.startDate = this.datePipe.transform((x.startDate, "dd.MM.yyyy'")))
        console.log(data)
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
          this.getAllBookData();
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
