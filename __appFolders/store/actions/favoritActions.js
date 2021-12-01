import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userID = auth().currentUser ? auth().currentUser.uid : null;

export const getFavoritProductsSuccess = products => {
  return {
    type: types.GET_FAVORIT_PRODUCTS_SUCCESS,
    products,
  };
};

export const toggleProductToFavoritSuccess = products => {
  return {
    type: types.TOGGLE_PRODUCT_TO_FAVORIT_SUCCESS,
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

// Getting the Cart products
export const getFavoritProducts = () => {
  return async dispatch => {
    const products = [];
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('favoritItems')
      .orderBy('toFavoritDate', 'desc')
      .get()
      .then(res => {
        res.forEach(document => {
          products.push(document.data());
        });
      })
      .catch(error => {
        console.log(error);
      });

    dispatch({type: types.GET_FAVORIT_PRODUCTS_SUCCESS, products: products});
  };
};
//
//
//
//
//

// Adding or Removing product to Favorit
export const toggleProductToFavorit = product => {
  return async dispatch => {
    // Getting all favorit proucts
    let products = [];
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('favoritItems')
      .get()
      .then(res => {
        res.forEach(document => {
          products.push(document.data());
        });
      })
      .catch(error => {
        console.log(error);
      });

    // Checking if the product exist in the favorit or not
    const existingIndex = products.findIndex(prod => prod.key === product.key);

    try {
      // Case product exist
      if (existingIndex >= 0) {
        await firestore()
          .collection('userObjects')
          .doc(userID)
          .collection('favoritItems')
          .doc(product.key)
          .delete();

        products = products.filter(item => item.key !== product.key);
        dispatch({
          type: types.TOGGLE_PRODUCT_TO_FAVORIT_SUCCESS,
          products: products,
        });
        // Case product doesn't exist
      } else {
        await firestore()
          .collection('userObjects')
          .doc(userID)
          .collection('favoritItems')
          .doc(product.key)
          .set({
            ...product,
            toFavoritDate: new Date().toUTCString(),
          });

        products = products.concat(product);
        dispatch({
          type: types.TOGGLE_PRODUCT_TO_FAVORIT_SUCCESS,
          products: products,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
