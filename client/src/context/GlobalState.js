import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

//initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getTransactions() {
    try {
      const response = await axios.get('/api/v1/transactions/');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error
      });
    }
  }
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }
  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }
  function editTransaction(transaction) {
    dispatch({
      type: 'EDIT_TRANSACTION',
      payload: transaction
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        deleteTransaction,
        addTransaction,
        editTransaction,
        error: state.error,
        loading: state.loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
