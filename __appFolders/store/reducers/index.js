import {combineReducers} from 'redux';
import productReducer from './porductReducer';

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
