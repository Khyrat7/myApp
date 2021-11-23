import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';

export const addReviewSuccess = (product, userID, review, rating) => {
  return {
    type: types.ADD_REVIEW_SUCCESS,
    product: product,
    userID: userID,
    review: review,
    rating: rating,
  };
};

export const getProductDataSuccess = product => {
  return {
    type: types.GET_PRODUCT_DATA_SUCCESS,
    product: product,
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

export const getProductData = productID => {
  return async dispatch => {
    var product;
    await firestore()
      .collection('products')
      .doc(productID)
      .get()
      .then(pro => {
        product = pro.data();
      });
    dispatch({type: types.GET_PRODUCT_DATA_SUCCESS, product: product});
  };
};
