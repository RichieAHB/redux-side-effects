import React from 'react';
import { connect } from 'react-redux';
import {
  selectShouldConfirmIncrement,
  selectCount,
  selectModalOpen
} from './selectors';
import { State } from './reducers/root';
import { confirmIncrement, maybeIncrement } from './actions';
import Modal from 'react-modal';

interface IncrementerProps {
  increment: () => void;
  modalOpen: boolean;
  accept: () => void;
  reject: () => void;
  count: number;
  shouldConfirmIncrement: boolean;
}

const Incrementer = ({
  increment,
  modalOpen,
  accept,
  reject,
  count,
  shouldConfirmIncrement
}: IncrementerProps) => (
  <div>
    <header>
      <h2>Confirm increment</h2>
    </header>
    <section>Count: {count}</section>
    <button onClick={increment}>
      {shouldConfirmIncrement ? 'Maybe increment' : 'Increment'}
    </button>
    <Modal isOpen={modalOpen} onRequestClose={reject} contentLabel="Increment?">
      <h1>Increment?</h1>
      <button onClick={accept}>Accept</button>
      <button onClick={reject}>Reject</button>
    </Modal>
  </div>
);

export default connect(
  (state: State) => ({
    modalOpen: selectModalOpen(state),
    count: selectCount(state),
    shouldConfirmIncrement: selectShouldConfirmIncrement(state)
  }),
  dispatch => ({
    increment: () => dispatch(maybeIncrement()),
    accept: () => dispatch(confirmIncrement(true)),
    reject: () => dispatch(confirmIncrement(false))
  })
)(Incrementer);
