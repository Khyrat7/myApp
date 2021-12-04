import firestore from '@react-native-firebase/firestore';
var faker = require('faker');

import * as types from './actionTypes';

export const getHomeProductsSuccess = products => {
  return {type: types.GET_HOME_PRODUCTS_SUCCESS, products};
};

export const getSearchProductsSuccess = products => {
  return {type: types.GET_SEARCH_PRODUCTS_SUCCESS, products};
};

export const createFakeDataSuccess = () => {
  return {type: types.CREATE_FAKE_DATA_SUCCESS};
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
      .orderBy('addedDate', 'desc')
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

export const getSearchProducts = searchText => {
  return async dispatch => {
    const products = [];
    await firestore()
      .collection('products')
      .get()
      .then(res => {
        res.forEach(document => {
          let productName = document.data().productName;
          productName = productName.toLowerCase();
          let textValidation = productName.search(searchText);

          if (textValidation !== -1) {
            products.push(document.data());
          }
        });
      })
      .catch(error => {
        console.log('error', error);
      });
    dispatch({type: types.GET_SEARCH_PRODUCTS_SUCCESS, products: products});
  };
};

export const createFakeData = () => {
  return dispatch => {
    for (let index = 0; index < 20; index++) {
      let newDoc = firestore().collection('products').doc();
      let docID = newDoc.id;
      firestore()
        .collection('products')
        .doc(docID)
        .set({
          category: faker.commerce.department(),
          colors: ['blue', 'red', 'orange', 'black', 'brown', 'green', 'white'],
          deliveryTime: '3-5 working days',
          key: docID,
          photos: [
            'https://placeimg.com/640/480/cats',
            'https://placeimg.com/640/480/people',
            'https://placeimg.com/640/480/nightlife',
            'https://placeimg.com/640/480/nature',
          ],
          price: faker.commerce.price(),
          description: faker.commerce.productDescription(),
          productName: faker.commerce.productName(),
          storageQuantitiy: 5,
          rating: 0,
          reviews: [],
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          totalReviews: 0,
        })
        .catch(error => {
          console.log('error', error);
        });
    }
    dispatch({type: types.CREATE_FAKE_DATA_SUCCESS});
  };
};
