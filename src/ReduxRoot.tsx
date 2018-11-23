import React, { useState } from 'react';
import { createStore, StoreEnhancer, Reducer } from 'redux';
import { Provider } from 'react-redux';
import Incrementer from './Incrementer';

interface Props<R> {
  rootReducer: R;
  enhancer: StoreEnhancer;
  afterCreateStore?: () => void;
  title: React.ReactNode;
}

const ReduxRoot = <R extends Reducer>({
  rootReducer,
  enhancer,
  afterCreateStore = () => {},
  title
}: Props<R>) => {
  const [store] = useState(() => {
    const s = createStore(rootReducer, enhancer);
    afterCreateStore();
    return s;
  });

  return (
    <Provider store={store}>
      <div>
        <h1>{title}</h1>
        <Incrementer />
      </div>
    </Provider>
  );
};

export default ReduxRoot;
