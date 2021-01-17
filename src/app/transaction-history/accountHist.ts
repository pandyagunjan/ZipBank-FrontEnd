import {TransactionHist} from './transactionHist';

export interface AccountHist{
  accountNumber: number;
  balance: number;
  transactions: TransactionHist[];
}
