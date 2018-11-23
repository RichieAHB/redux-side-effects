import { Action, ModalType } from '../types/Action';

type ModalState = ModalType | null;

export default (state: ModalState = null, action: Action): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return action.payload.type;
    }
    case 'CLOSE_MODAL': {
      return null;
    }
    default: {
      return state;
    }
  }
};
