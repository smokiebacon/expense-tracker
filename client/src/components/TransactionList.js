import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      {transactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};
