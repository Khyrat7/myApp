import firestore from '@react-native-firebase/firestore';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const productsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case types.GET_HOME_PRODUCTS_SUCCESS:
      return {...state, allProducts: action.products};

    case types.GET_SEARCH_PRODUCTS_SUCCESS:
      return {...state, searchProducts: action.products};

    case types.CREATE_FAKE_DATA_SUCCESS:
      return {...state};

    default:
      return state;
  }
};

export default productsReducer;
