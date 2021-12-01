import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userID = auth().currentUser ? auth().currentUser.uid : null;

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

export const getCartTotalsSuccess = (totalPrice, totalItmes) => {
  return {
    type: types.GET_CART_TOTALS_SUCCESS,
    totalPrice,
    totalItmes,
  };
};

export const getCartProductSuccess = product => {
  return {
    type: types.GET_CART_PRODUCT_SUCCESS,
    product,
  };
};

export const updateCartProductSuccess = product => {
  return {
    type: types.UPDATE_CART_PRODUCT_SUCCESS,
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

// Getting the Cart products
export const getCartProducts = () => {
  return async dispatch => {
    const products = [];
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .orderBy('toCartDate', 'desc')
      .get()
      .then(res => {
        res.forEach(document => {
          products.push(document.data());
        });
      });

    await dispatch({type: types.GET_CART_PRODUCTS_SUCCESS, products: products});
    getCartTotals();
  };
};
//

// Adding or Removing product to Cart
export const toggleProductToCart = product => {
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

        products = products.filter(item => item.key !== product.key);
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
            toCartDate: new Date().toUTCString(),
            toOrdersDate: '',
            reviews: [],
            orderDetails: {
              deliveryStatus: 'ordered',
              numberOfItems: 1,
              color: 'Any',
              note: '',
              deliveryAddress: '',
              size: '',
            },
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
//

// Getting the Cart totals
export const getCartTotals = () => {
  return async dispatch => {
    let totalItems = 0;
    let totalPrice = 0;
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .get()
      .then(res => {
        res.forEach(prod => {
          let price = parseInt(prod.data().price);
          let itemCount = prod.data().orderDetails.numberOfItems;
          totalItems = totalItems + itemCount;
          totalPrice = totalPrice + price * itemCount;
        });
      });

    dispatch({
      type: types.GET_CART_TOTALS_SUCCESS,
      totalItmes: totalItems,
      totalPrice: totalPrice,
    });
  };
};

// Getting the Cart product
export const getCartProduct = productID => {
  return async dispatch => {
    let product = {};
    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .doc(productID)
      .get()
      .then(prod => {
        product = prod.data();
      })
      .catch(error => {
        console.log(error);
      });
    // console.log('cart product in action :', product);
    dispatch({type: types.GET_CART_PRODUCT_SUCCESS, product: product});
  };
};

// Update Cart Product order details
export const updateCartProduct = (
  productID,
  numberOfItems,
  size,
  color,
  note,
  address,
) => {
  return async dispatch => {
    let orderDetails = {
      color: color,
      deliveryAddress: address,
      note: note,
      numberOfItems: numberOfItems,
      size: size,
    };
    let product = {};

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .doc(productID)
      .update({
        orderDetails: orderDetails,
      })
      .catch(error => {
        console.log(error);
      });

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('cartItems')
      .doc(productID)
      .get()
      .then(prod => {
        product = prod.data();
      })
      .catch(error => {
        console.log(error);
      });

    dispatch({type: types.UPDATE_CART_PRODUCT_SUCCESS, product: product});
  };
};
