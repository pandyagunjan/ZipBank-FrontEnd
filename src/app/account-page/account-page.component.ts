import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AddressComponent} from '../address/address.component';
import {MatDialog} from '@angular/material/dialog';
import {TransactionsComponent} from '../transactions/transactions.component';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  url: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(url => {
      this.url = url.toString();
    });
  }
}
