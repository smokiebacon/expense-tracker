import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  let total = amounts.reduce((sum, item) => (sum += item), 0).toFixed(2);
  return <div id="balance">Balance: ${total}</div>;
};
