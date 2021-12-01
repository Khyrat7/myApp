import firestore from '@react-native-firebase/firestore';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const productReducer = (state = initialState.product, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_DATA_SUCCESS:
      return action.product;

    case types.ADD_REVIEW_SUCCESS:
      return action.product;

    default:
      return state;
  }
};

export default productReducer;
