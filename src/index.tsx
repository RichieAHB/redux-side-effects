import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { applyMiddleware } from 'redux';
import ReduxRoot from './ReduxRoot';

// redux-saga imports
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './redux-saga/sagas';
import reducer from './reducers/root';

// redux-loop imports
import { install } from 'redux-loop';
import loopReducer from './redux-loop/reducer';

const root = document.getElementById('root');

if (root) {
  const sagaMiddlware = createSagaMiddleware();
  Modal.setAppElement(root);
  ReactDOM.render(
    <div>
      {/* Test redux-saga setup */}
      <ReduxRoot
        rootReducer={reducer}
        enhancer={applyMiddleware(sagaMiddlware)}
        afterCreateStore={() => sagaMiddlware.run(rootSaga)}
        title="Redux saga"
      />
      {/* Test redux-loop setup */}
      <ReduxRoot
        rootReducer={loopReducer}
        enhancer={install()}
        title="Redux loop"
      />
    </div>,
    root
  );
} else {
  throw new Error('Could not find in element #root');
}
