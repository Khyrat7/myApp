import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userID = auth().currentUser ? auth().currentUser.uid : null;

export const setNewOrderSuccess = () => {
  return {
    type: types.SET_NEW_ORDER_SUCCESS,
  };
};

export const getOrdersProductSuccess = orders => {
  return {
    type: types.GET_ORDERS_PRODUCTS_SUCCESS,
    orders,
  };
};

export const setOrderItemSuccess = order => {
  return {
    type: types.SET_ORDER_ITEM_SUCCESS,
    order,
  };
};

//
//
//
//
//
//
//
//
//
//
// ________________________ Thunks ________________________

// Getting the Cart products
export const setNewOrder = (orderArray, totalPrice, totalItems) => {
  return async dispatch => {
    const orderDate = new Date().toUTCString();
    const products = [];

    await orderArray.forEach(async item => {
      let key = item.key;
      await firestore()
        .collection('userObjects')
        .doc(userID)
        .collection('cartItems')
        .doc(key)
        .update({
          toOrdersDate: orderDate,
        });
    });

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .get()
      .then(items => {
        items.forEach(item => {
          products.push(item.data());
        });
      });

    await orderArray.forEach(async item => {
      let key = item.key;
      await firestore()
        .collection('userObjects')
        .doc(userID)
        .collection('cartItems')
        .doc(key)
        .delete();
    });

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('orderItems')
      .doc(orderDate)
      .set({
        ordersArray: products,
        totalPrice: totalPrice,
        totalItems: totalItems,
        orderDate: orderDate,
      });

    dispatch({type: types.SET_NEW_ORDER_SUCCESS});
  };
};

export const getOrdersProducts = userID => {
  return async dispatch => {
    let orders = [];
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('orderItems')
      .orderBy('orderDate', 'desc')
      .get()
      .then(ordersData => {
        ordersData.forEach(order => {
          orders.push(order.data());
        });
      });

    dispatch({type: types.GET_ORDERS_PRODUCTS_SUCCESS, orders: orders});
  };
};
