import { Component, OnInit } from '@angular/core';
import {Account} from '../list-accounts/list-accounts.component';
import {AccountListService} from '../services/account-list/account-list.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authenticationservice.service';
@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
account: Account;
  constructor(private router: Router, public listService: AccountListService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
//    this.getAccount();
  }
  // tslint:disable-next-line:typedef
  // getAccount()
  // {
  //   this.listService.retrieveAccount('Null').subscribe(
  //     response => {
  //       console.log(response);
  //       // @ts-ignore
  //       this.account = response; },
  //     error => console.log('couldn\'t get because', error)
  //   );
  // }
  // tslint:disable-next-line:typedef
  navigateToTransactions(url)
  {
    this.router.navigate(['transaction', url]);
  }
}
