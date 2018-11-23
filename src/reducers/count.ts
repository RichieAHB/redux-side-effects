import { Action } from '../types/Action';

type CountState = number;

export default (state: CountState = 0, action: Action): CountState => {
  switch (action.type) {
    case 'INCREMENT': {
      return state + 1;
    }
    default: {
      return state;
    }
  }
};
