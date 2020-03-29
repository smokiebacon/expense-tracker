const Transaction = require('../models/Transaction');
const Day = require('../models/Day');

// @description. Get All Transactions
// @route GET /api/v1/transactions
// @acess Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json({
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @description. Add a Transaction
// @route POST /api/v1/transactions
// @acess Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount, category, date } = req.body;
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      data: transaction
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @description. Delete a Transaction
// @route DELETE /api/v1/transactions/:id
// @acess Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction) {
      return res.status(404).json({
        error: 'No transaction found'
      });
    }
    res.status(200).json({
      success: 'Transaction successfully deleted',
      data: deletedTransaction
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @description. Edit a Transactions
// @route PUT /api/v1/transactions/:id
// @access Public
exports.editTransaction = async (req, res, next) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, useFindAndModify: false }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        error: 'No transaction found to edit'
      });
    }

    res.status(200).json({
      success: 'Transaction was successfully edited.',
      data: updatedTransaction
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error in editTransaction'
    });
  }
};

// Show Route
exports.showSingleTransaction = async (req, res) => {
  try {
    const foundTransaction = await Transaction.findById(req.params.id);
    res.json({
      status: 200,
      data: foundTransaction
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error in showSingleTransaction'
    });
  }
};
