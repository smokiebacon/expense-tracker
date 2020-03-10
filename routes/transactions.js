const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
  showSingleTransaction
} = require('../controllers/transactions');

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

router
  .route('/:id')
  .delete(deleteTransaction)
  .put(editTransaction)
  .get(showSingleTransaction);

module.exports = router;
