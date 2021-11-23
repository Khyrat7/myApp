import firestore from '@react-native-firebase/firestore';

import * as types from './actionTypes';

export const getHomeProductsSuccess = products => {
  return {type: types.GET_HOME_PRODUCTS_SUCCESS, products};
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
export const getHomeProducts = () => {
  return async dispatch => {
    const products = [];
    await firestore()
      .collection('products')
      .get()
      .then(res => {
        res.forEach(document => {
          products.push(document.data());
        });
      })
      .catch(error => {
        console.log('error', error);
      });
    dispatch({type: types.GET_HOME_PRODUCTS_SUCCESS, products: products});
  };
};
