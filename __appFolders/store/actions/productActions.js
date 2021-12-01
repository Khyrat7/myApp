import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';

export const getProductDataSuccess = product => {
  return {
    type: types.GET_PRODUCT_DATA_SUCCESS,
    product: product,
  };
};

export const addReviewSuccess = product => {
  return {
    type: types.ADD_REVIEW_SUCCESS,
    product,
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
      })
      .catch(error => {
        throw error;
      });

    dispatch({type: types.GET_PRODUCT_DATA_SUCCESS, product: product});
  };
};

export const addReview = (productID, rating, review, user) => {
  return async dispatch => {
    let product;
    let reviewData = {
      userID: user.userID,
      review: review,
      reviewDate: new Date().toUTCString(),
      rating: rating,
    };
    // getting product data
    await firestore()
      .collection('products')
      .doc(productID)
      .get()
      .then(prod => {
        product = prod.data();
      })
      .catch(error => {
        throw error;
      });
    const productRating = product.rating;
    const productTotalReviews = product.totalReviews;

    await firestore()
      .collection('products')
      .doc(productID)
      .update({
        rating: productRating + rating,
        totalReviews: productTotalReviews + 1,
        reviews: firestore.FieldValue.arrayUnion(reviewData),
      })
      .catch(error => {
        throw error;
      });

    // getting the product datat after updating
    await firestore()
      .collection('products')
      .doc(productID)
      .get()
      .then(prod => {
        product = prod.data();
      })
      .catch(error => {
        throw error;
      });

    dispatch({type: types.ADD_REVIEW_SUCCESS, product: product});
  };
};
