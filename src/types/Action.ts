interface ConfirmIncrement {
  type: 'CONFIRM_INCREMENT';
  payload: boolean;
}

interface MaybeIncrement {
  type: 'MAYBE_INCREMENT';
}

interface Increment {
  type: 'INCREMENT';
}

export type ModalType = 'CONFIRM_INCREMENT_MODAL';

interface OpenModal {
  type: 'OPEN_MODAL';
  payload: {
    type: ModalType;
  };
}

interface CloseModal {
  type: 'CLOSE_MODAL';
}

export type Action =
  | ConfirmIncrement
  | MaybeIncrement
  | Increment
  | OpenModal
  | CloseModal;
