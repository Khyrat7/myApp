import firestore from '@react-native-firebase/firestore';

const dataArray = [];

firestore()
  .collection('products')
  .get()
  .then(res => {
    res.forEach(document => {
      dataArray.push(document.data());
    });
  });

export default {
  products: dataArray,
  product: null,
};
