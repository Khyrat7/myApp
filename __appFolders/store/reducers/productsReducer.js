import firestore from '@react-native-firebase/firestore';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const productsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case types.GET_HOME_PRODUCTS_SUCCESS:
      //   console.log('products reducer : ', action.products);
      return action.products;

    default:
      return state;
  }
};

export default productsReducer;
