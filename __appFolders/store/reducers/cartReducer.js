import initialState from './initialState';
import * as types from '../actions/actionTypes';

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case types.GET_CART_PRODUCTS_SUCCESS:
      return action.products;

    case types.TOGGLE_PRODUCT_TO_CART_SUCCESS:
      return action.products;

    default:
      return state;
  }
};

export default cartReducer;
