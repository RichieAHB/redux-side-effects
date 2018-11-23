import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { install } from 'redux-loop';
import ReduxRoot from './ReduxRoot';
import { rootSaga } from './redux-saga/sagas';
import reducer from './reducers/root';
import loopReducer from './redux-loop/reducer';

const root = document.getElementById('root');

if (root) {
  const sagaMiddlware = createSagaMiddleware();
  Modal.setAppElement(root);
  ReactDOM.render(
    <div>
      {/* Test saga middleware */}
      <ReduxRoot
        rootReducer={reducer}
        enhancer={applyMiddleware(sagaMiddlware)}
        afterCreateStore={() => sagaMiddlware.run(rootSaga)}
        title="Redux saga"
      />
      {/* Test loop middleware */}
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