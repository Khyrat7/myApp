import React from 'react';
import 'react-native-gesture-handler';
import LayoutContext from './__appFolders/context/LayoutContext';
import MainStackNavigator from './__appFolders/src/screens/navigation/MainStackNavigator';
import configureStore from './__appFolders/store/configStore';
import {Provider as ReduxProvider} from 'react-redux';

const store = configureStore();

export default App = () => {
  return (
    <ReduxProvider store={store}>
      <LayoutContext>
        <MainStackNavigator />
      </LayoutContext>
    </ReduxProvider>
  );
};

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
