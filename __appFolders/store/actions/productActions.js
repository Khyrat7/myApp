import * as types from './actionTypes';

export const addReview = (product, userID, review, rating) => {
  return {
    type: types.ADD_REVIEW,
    product: product,
    userID: userID,
    review: review,
    rating: rating,
  };
};

export const getProductData = productID => {
  return {
    type: types.GET_PRODUCT_DATA,
    productID: productID,
  };
};
