import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const EditTransaction = transaction => {
  const { editTransaction } = useContext(GlobalContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const categoryList = ['Restaurants', 'Groceries', 'Shopping'];
  const [category, setCategory] = useState('Restaurants');
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              value={category}
              onChange={e => {
                console.log(e, 'i am E');

                setCategory(e.target.value);
              }}
              controlId="exampleForm.ControlSelect1"
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
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                value={props.transaction.transaction.amount}
                onChange={e => setAmount(e.target.value)}
                type="number"
                placeholder="Price"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={props.transaction.transaction.text}
                onChange={e => setText(e.target.value)}
                placeholder="Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
          <Button onClick={onSubmit} variant={'success'}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      id: uuidv4(),
      text,
      amount: +amount,
      category
    };
    editTransaction(newTransaction);
    setModalShow(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Edit
      </Button>
      <MyVerticallyCenteredModal
        transaction={transaction}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />{' '}
    </div>
  );
};
