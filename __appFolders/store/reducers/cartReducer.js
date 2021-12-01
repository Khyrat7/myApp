import initialState from './initialState';
import * as types from '../actions/actionTypes';

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case types.GET_CART_PRODUCTS_SUCCESS:
      return {...state, cartItems: action.products};

    case types.TOGGLE_PRODUCT_TO_CART_SUCCESS:
      return {...state, cartItems: action.products};
    case types.GET_CART_TOTALS_SUCCESS:
      return {
        ...state,
        cartTotalPrice: action.totalPrice,
        cartTotalItems: action.totalItmes,
      };

    case types.GET_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        cartProduct: action.product,
      };

    case types.UPDATE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        cartProduct: action.product,
      };

    default:
      return state;
  }
};

export default cartReducer;
