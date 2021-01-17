import {TransactionHist} from './transactionHist';

export interface AccountHist{
  accountNumber: number;
  accountType: string;
  balance: number;
  encryptedUrl: string;
  transactions: TransactionHist[];
}
