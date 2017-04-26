/* global NODE_ENV:false */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';
import rootSaga from 'sagas';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  let finalCreateStore;

  if (NODE_ENV === 'development') {
    const logger = createLogger();
    finalCreateStore = compose(
      applyMiddleware(
        sagaMiddleware,
        logger,
      ),
      // eslint-disable-next-line no-undef
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(
        sagaMiddleware,
      ),
    )(createStore);
  }

  const store = finalCreateStore(rootReducer);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
