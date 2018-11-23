import { Action, ModalType } from './types/Action';

export const confirmIncrement = (payload: boolean): Action => ({
  type: 'CONFIRM_INCREMENT',
  payload
});

export const maybeIncrement = (): Action => ({
  type: 'MAYBE_INCREMENT'
});

export const increment = (): Action => ({
  type: 'INCREMENT'
});

export const openModal = (type: ModalType): Action => ({
  type: 'OPEN_MODAL',
  payload: { type }
});

export const closeModal = (): Action => ({
  type: 'CLOSE_MODAL'
});
