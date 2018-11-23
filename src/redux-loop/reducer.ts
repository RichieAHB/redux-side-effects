import { Action } from '../types/Action';
import { loop, Cmd, Loop, reduceReducers } from 'redux-loop';
import { openModal, increment, closeModal } from '../actions';
import root, { State } from '../reducers/root';
import { selectShouldConfirmIncrement } from '../selectors';

// Needed for reduce reducers
// https://github.com/redux-loop/redux-loop/issues/160#issuecomment-441302122
const initialState = root(undefined, { type: '@@@@@' });

const effects = (
  state: State = initialState,
  action: Action
): State | Loop<State, Action> => {
  switch (action.type) {
    case 'MAYBE_INCREMENT': {
      return loop(
        state,
        Cmd.action(
          selectShouldConfirmIncrement(state)
            ? openModal()
            : increment()
        )
      );
    }
    case 'CONFIRM_INCREMENT': {
      return loop(
        state,
        Cmd.list([
          Cmd.action(closeModal()),
          // payload here is inferred correctly, unlike redux-saga
          action.payload ? Cmd.action(increment()) : Cmd.none
        ])
      );
    }
    default: {
      return state;
    }
  }
};

export default reduceReducers(root, effects);
