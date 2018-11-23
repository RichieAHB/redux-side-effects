import { combineReducers } from 'redux';
import modal from './modal';
import count from './count';

const root = combineReducers({
  modal,
  count
});

export type State = ReturnType<typeof root>;

export default root;
