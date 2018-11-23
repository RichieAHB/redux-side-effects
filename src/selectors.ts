import { State } from './reducers/root';

export const selectCount = (state: State) => state.count;
export const selectShouldConfirmIncrement = (state: State) =>
  selectCount(state) >= 5;
export const selectModalOpen = (state: State) => state.modal;
