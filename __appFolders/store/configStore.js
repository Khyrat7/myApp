import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function cofigureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant())),
  );
}
