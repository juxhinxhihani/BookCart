import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss'],
  providers: [DatePipe]
})
export class PendingListComponent implements OnInit {

  displayedColumns: string[] = ['issueId', 'firstName', 'book', 'author', 'phoneNumber','returnDate','Approve'];
  displayedColumns2: string[] = ['issueId', 'firstName', 'book', 'author', 'phoneNumber', 'startDate'];

  dataSource = new MatTableDataSource<PendingBooks>();
  @Input()
  childId: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private bookService: IssuedBookService,
    private datePipe : DatePipe,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar,
    private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.getAllBookData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getAllBookData() {
    if(this.childId == 1) {
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
    else {
      this.bookService.getallissued()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: PendingBooks[]) => {
          // data.forEach( x=> x.startDate = this.datePipe.transform((x.startDate, "dd.MM.yyyy'")))
          console.log(data)
          this.dataSource.data = Object.values(data);
        }, error => {
          console.log('Error ocurred while fetching book details : ', error);
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approve(id: number) {
    this.bookService.openConfirmDialog('Are you sure you want to approve it?')
      .afterClosed().subscribe((res => {
      if (res) {
        this.bookService.approve(id).subscribe((result) => {
          this._snackBar.open('Succesfully approved', 'Close', {
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

}
