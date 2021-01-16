import {AccountNumbers} from './transactions.component';

export interface Transaction{
  transactionAmmount: number;
  accounts: AccountNumbers[];
}
