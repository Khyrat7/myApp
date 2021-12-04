import firestore from '@react-native-firebase/firestore';
import initialState from './initialState';
import * as types from '../actions/actionTypes';
import {Item} from 'react-navigation-header-buttons';

const adminReducer = (state = initialState.admin, action) => {
  switch (action.type) {
    case types.ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        allProducts: action.products,
      };

    case types.GET_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.products,
      };

    case types.GET_ADMIN_ORDERS_SUCCESS:
      const orders = action.products;

      const activeOrders = orders.filter(
        item => item.orderDetails.deliveryStatus === 'active',
      );
      // console.log('active orders :', activeOrders);

      const finishedOrders = orders.filter(
        item => item.orderDetails.deliveryStatus === 'done',
      );
      // console.log('done orders :', finishedOrders);

      return {
        ...state,
        allOrders: action.products,
        activeOrders: activeOrders,
        doneOrders: finishedOrders,
      };

    default:
      return state;
  }
};

export default adminReducer;
