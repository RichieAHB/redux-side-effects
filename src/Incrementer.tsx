import React from 'react';
import { connect } from 'react-redux';
import {
  selectShouldConfirmIncrement,
  selectCount,
  selectOpenModal
} from './selectors';
import { State } from './types/State';
import { confirmIncrement, maybeIncrement } from './actions';
import Modal from 'react-modal';

interface IncrementerProps {
  increment: () => void;
  openModal: string | null;
  accept: () => void;
  reject: () => void;
  count: number;
  shouldConfirmIncrement: boolean;
}

const Incrementer = ({
  increment,
  openModal,
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
    <Modal
      isOpen={openModal === 'CONFIRM_INCREMENT_MODAL'}
      onRequestClose={reject}
      contentLabel="Increment?"
    >
      <h1>Increment?</h1>
      <button onClick={accept}>Accept</button>
      <button onClick={reject}>Reject</button>
    </Modal>
  </div>
);

export default connect(
  (state: State) => ({
    openModal: selectOpenModal(state),
    count: selectCount(state),
    shouldConfirmIncrement: selectShouldConfirmIncrement(state)
  }),
  dispatch => ({
    increment: () => dispatch(maybeIncrement()),
    accept: () => dispatch(confirmIncrement(true)),
    reject: () => dispatch(confirmIncrement(false))
  })
)(Incrementer);
