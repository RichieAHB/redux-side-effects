import { Action } from '../types/Action';
import { loop, Cmd, Loop } from 'redux-loop';
import { openModal, increment, closeModal } from '../actions';
import { selectShouldConfirmIncrement } from '../selectors';

export interface State {
  openModal: string | null;
  count: number;
}

export default (
  state: State = { openModal: null, count: 0 },
  action: Action
): State | Loop<State, Action> => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        openModal: action.payload.type
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        openModal: null
      };
    }
    case 'MAYBE_INCREMENT': {
      return loop(
        state,
        Cmd.action(
          selectShouldConfirmIncrement(state)
            ? openModal('CONFIRM_INCREMENT_MODAL')
            : increment()
        )
      );
    }
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + 1
      };
    }
    case 'CONFIRM_INCREMENT': {
      return loop(
        state,
        Cmd.list([
          Cmd.action(closeModal()),
          // payload here is inferred correctly
          action.payload ? Cmd.action(increment()) : Cmd.none
        ])
      );
    }
    default: {
      return state;
    }
  }
};
