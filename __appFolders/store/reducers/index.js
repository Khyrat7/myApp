import {combineReducers} from 'redux';
import productReducer from './porductReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import favoritReducer from './favoritReducer';
import userReducer from './userReducer';
import ordersReducer from './ordersReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  product: productReducer,
  products: productsReducer,
  cart: cartReducer,
  favorit: favoritReducer,
  user: userReducer,
  orders: ordersReducer,
  admin: adminReducer,
});

export default rootReducer;
