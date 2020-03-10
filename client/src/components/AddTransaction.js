import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const categoryList = ['Restaurants', 'Groceries', 'Shopping'];
  const [category, setCategory] = useState('Restaurants');

  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      id: uuidv4(),
      text,
      amount: +amount,
      category
    };
    addTransaction(newTransaction);
  };

  return (
    <div>
      <Button onClick={onSubmit} variant="primary">
        Add Transaction
      </Button>
      <Form>
        <Row>
          <Col>
            <Form.Group
              onChange={e => setCategory(e.target.value)}
              controlId="exampleForm.ControlSelect1"
              value={category}
            >
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                {categoryList.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
                }
              </Form.Control>
            </Form.Group>
            <Form.Control
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Description"
            />
          </Col>
          <Col>
            <Form.Control
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              placeholder="Price"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
