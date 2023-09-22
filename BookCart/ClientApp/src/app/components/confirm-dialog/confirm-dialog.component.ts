import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserType} from "../../models/usertype";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {SubscriptionService} from "../../services/subscription.service";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  userId;
  userDataSubscription: any;
  userData = new User();
  userType = UserType;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');

  }

  ngOnInit(): void {
    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

}
