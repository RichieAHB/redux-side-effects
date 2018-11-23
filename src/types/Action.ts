export interface ConfirmIncrement {
  type: 'CONFIRM_INCREMENT';
  payload: boolean;
}

export interface MaybeIncrement {
  type: 'MAYBE_INCREMENT';
}

export interface Increment {
  type: 'INCREMENT';
}

export type ModalType = 'CONFIRM_INCREMENT_MODAL';

export interface OpenModal {
  type: 'OPEN_MODAL';
}

export interface CloseModal {
  type: 'CLOSE_MODAL';
}

export type Action =
  | ConfirmIncrement
  | MaybeIncrement
  | Increment
  | OpenModal
  | CloseModal;
