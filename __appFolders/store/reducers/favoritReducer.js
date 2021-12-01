import initialState from './initialState';
import * as types from '../actions/actionTypes';

const favoritReducer = (state = initialState.favorit, action) => {
  switch (action.type) {
    case types.GET_FAVORIT_PRODUCTS_SUCCESS:
      return action.products;

    case types.TOGGLE_PRODUCT_TO_FAVORIT_SUCCESS:
      return action.products;

    default:
      return state;
  }
};

export default favoritReducer;
