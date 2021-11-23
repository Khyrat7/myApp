import firestore from '@react-native-firebase/firestore';

// const dataArray = [];

// firestore()
//   .collection('products')
//   .get()
//   .then(res => {
//     res.forEach(document => {
//       dataArray.push(document.data());
//       console.log('initial state product : ', document.data());
//     });
//     console.log('products data : ', dataArray);
//   });

export default {
  products: [],
  product: {},
  cart: [],
};
