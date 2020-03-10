import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { v4 as uuidv4 } from 'uuid';

//initial state
const initialState = {
  transactions: []
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
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
        deleteTransaction,
        addTransaction,
        editTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
