import { Action } from '../types/Action';

type ModalState = boolean;

export default (state: ModalState = false, action: Action): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return true;
    }
    case 'CLOSE_MODAL': {
      return false;
    }
    default: {
      return state;
    }
  }
};
