import { State } from './types/State';

export const selectCount = (state: State) => state.count;
export const selectShouldConfirmIncrement = (state: State) =>
  selectCount(state) >= 5;
export const selectOpenModal = (state: State) => state.openModal;
