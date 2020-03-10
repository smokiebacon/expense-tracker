import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { EditTransaction } from './EditTransaction';

export const Transaction = ({ transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';
  const variantClass = transaction.amount < 0 ? 'danger' : 'success';
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <div>
      <Card border="primary" style={{ width: '20rem' }}>
        <Card.Header className="text-muted">
          Today
          <Button
            onClick={() => deleteTransaction(transaction.id)}
            variant="outline-danger"
          >
            X
          </Button>
          <EditTransaction transaction={transaction} />
        </Card.Header>

        <Card.Body>
          <Card.Title>{transaction.category}</Card.Title>
          <ListGroup>
            <ListGroup.Item>{transaction.text}</ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item variant={variantClass}>
              {sign}${Math.abs(transaction.amount)}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};
