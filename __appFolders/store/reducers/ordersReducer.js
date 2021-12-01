import initialState from './initialState';
import * as types from '../actions/actionTypes';

const ordersReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.SET_NEW_ORDER_SUCCESS:
      return state;

    case types.GET_ORDERS_PRODUCTS_SUCCESS:
      return {
        ...state,
        allOrders: action.orders,
      };

    case types.SET_ORDER_ITEM_SUCCESS:
      return {
        ...state,
        orderItem: action.order,
      };

    default:
      return state;
  }
};

export default ordersReducer;
