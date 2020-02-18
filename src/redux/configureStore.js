import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { shopReducer } from './reducers/shopReducer';
import { commonReducers } from './reducers/commonReducers'
import { watchAuth } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  user: userReducer,
  shop: shopReducer,
  commonReducers: commonReducers
});
const store = createStore(reducers, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(watchAuth);

export default store;
