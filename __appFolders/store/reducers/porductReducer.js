import firestore from '@react-native-firebase/firestore';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const productReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_DATA:
      var product;
      firestore()
        .collection('products')
        .doc(action.productID)
        .get()
        .data()
        .then(pro => {
          product = pro.data();
        });
      console.log('product variable in reducer :', product);
      console.log('the state of the product in reducer : ', state);
      return {...state, ...product};

    default:
      return state;
  }
};

export default productReducer;
