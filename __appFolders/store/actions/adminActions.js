import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';

export const addNewProductSuccess = products => {
  return {
    type: types.ADD_NEW_PRODUCT_SUCCESS,
    products,
  };
};

export const getAdminProductsSuccess = products => {
  return {
    type: types.GET_ADMIN_PRODUCTS_SUCCESS,
    products,
  };
};

export const getAdminOrdersSuccess = products => {
  return {
    type: types.GET_ADMIN_ORDERS_SUCCESS,
    products,
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

export const addNewProduct = (product, userID) => {
  return async dispatch => {
    const products = [];

    let newDoc = firestore().collection('products').doc();
    let docID = newDoc.id;

    await firestore()
      .collection('products')
      .doc(docID)
      .set({
        ...product,
        key: docID,
      });
    await firestore()
      .collection('products')
      .get()
      .then(productsData => {
        productsData.forEach(prod => {
          if (prod.data().sellerID === userID) {
            products.push(prod.data());
          }
        });
      });
    dispatch({type: types.ADD_NEW_PRODUCT_SUCCESS, products: products});
  };
};

export const getAdminProducts = userID => {
  return async dispatch => {
    const products = [];
    await firestore()
      .collection('products')
      .orderBy('addedDate', 'desc')
      .get()
      .then(productsData => {
        productsData.forEach(prod => {
          if (prod.data().sellerID === userID) {
            products.push(prod.data());
          }
        });
      });
    dispatch({type: types.GET_ADMIN_PRODUCTS_SUCCESS, products: products});
  };
};

export const getAdminOrders = userID => {
  return async dispatch => {
    const products = [];
    await firestore()
      .collection('sellerObjects')
      .doc(userID)
      .collection('orders')
      .orderBy('toOrdersDate', 'desc')
      .get()
      .then(productsData => {
        productsData.forEach(prod => {
          products.push(prod.data());
        });
      })
      .catch(error => {
        console.log(error);
      });

    dispatch({type: types.GET_ADMIN_ORDERS_SUCCESS, products: products});
  };
};
