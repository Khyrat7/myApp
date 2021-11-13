import React from 'react';
import 'react-native-gesture-handler';
import LayoutContext from './__appFolders/context/LayoutContext';
import MainStackNavigator from './__appFolders/src/screens/navigation/MainStackNavigator';

// Fake data creation
// var faker = require('faker');
// import firestore from '@react-native-firebase/firestore';

export default App = () => {
  // createFakeProducts = async () => {
  //   let i = 20;

  //   try {
  //     for (let index = 0; index < i; index++) {
  //       let key = await firestore().collection('products').doc().id;
  //       await firestore()
  //         .collection('products')
  //         .doc(key)
  //         .set({
  //           key: key,
  //           productName: faker.commerce.productName(),
  //           description: faker.commerce.productDescription(),
  //           photos: [
  //             'https://placeimg.com/640/480/fashion',
  //             'https://placeimg.com/640/480/animals',
  //             'https://placeimg.com/640/480/cats',
  //           ],
  //           quantity: 3,
  //           rating: 0,
  //           totalReviews: 0,
  //           reviews: [],
  //           price: faker.commerce.price(),
  //           colors: [
  //             faker.commerce.color(),
  //             faker.commerce.color(),
  //             faker.commerce.color(),
  //           ],
  //           deliveryTime: '2 - 3 Days',
  //           category: faker.random.word(),
  //           size: 44,
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // createFakeProducts();

  return (
    <LayoutContext>
      <MainStackNavigator />
    </LayoutContext>
  );
};
