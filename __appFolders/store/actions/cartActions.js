import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userID = auth().currentUser.uid;

export const getCartProductsSuccess = products => {
  return {
    type: types.GET_CART_PRODUCTS_SUCCESS,
    products,
  };
};

export const toggleProductToCartSuccess = products => {
  return {
    type: types.TOGGLE_PRODUCT_TO_CART_SUCCESS,
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
export const getCartProducts = () => {
  return async dispatch => {
    const products = [];
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .get()
      .then(res => {
        res.forEach(document => {
          products.push(document.data());
        });
      });

    dispatch({type: types.GET_CART_PRODUCTS_SUCCESS, products: products});
  };
};
//
//
//
//
//

// Adding or Removing product to Cart
export const toggleProductToCart = product => {
  console.log('toggle products entered');
  return async dispatch => {
    // Getting all cart proucts
    let products = [];
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .get()
      .then(res => {
        res.forEach(document => {
          products.push(document.data());
        });
      })
      .catch(error => {
        console.log(error);
      });

    // Checking if the product exist in the cart or not
    const existingIndex = products.findIndex(prod => prod.key === product.key);

    try {
      // Case product exist
      if (existingIndex >= 0) {
        await firestore()
          .collection('userObjects')
          .doc(userID)
          .collection('cartItems')
          .doc(product.key)
          .delete();

        products = products.splice(existingIndex, 1);
        dispatch({
          type: types.TOGGLE_PRODUCT_TO_CART_SUCCESS,
          products: products,
        });
        // Case product doesn't exist
      } else {
        await firestore()
          .collection('userObjects')
          .doc(userID)
          .collection('cartItems')
          .doc(product.key)
          .set({
            ...product,
          });
        products = products.concat(product);

        dispatch({
          type: types.TOGGLE_PRODUCT_TO_CART_SUCCESS,
          products: products,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
