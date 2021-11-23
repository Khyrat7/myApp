import {combineReducers} from 'redux';
import productReducer from './porductReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  product: productReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
