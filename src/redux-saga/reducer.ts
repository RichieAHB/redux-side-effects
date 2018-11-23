import { State } from '../types/State';
import { Action } from '../types/Action';

export default (
  state: State = { openModal: null, count: 0 },
  action: Action
): State => {
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
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + 1
      };
    }
    default: {
      return state;
    }
  }
};
