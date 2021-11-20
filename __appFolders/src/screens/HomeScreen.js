import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  SnapshotViewIOSBase,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';
import firestore from '@react-native-firebase/firestore';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ProductFeed from '../components/ProductFeed';
import Constants from '../../constants/PhoneDimentions';
import Swiper from 'react-native-swiper';

export default HomeScreen = props => {
  // Props and Hooks
  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  userID = auth().currentUser.uid;

  const getProducts = async () => {
    const productsArray = [];
    try {
      await firestore()
        .collection('products')
        .get()
        .then(res => {
          res.docs.forEach(document => {
            productsArray.push(document.data());
            setProducts(productsArray);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    // console.log('products Array : ', products);
  }, []);

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: themeColors.background,
    },
  });

  return (
    <SafeAreaView style={{backgroundColor: themeColors.background}}>
      <FlatList
        data={products}
        // the product object has a value for the Key === product id
        // keyExtractor={(item, index) => item.key + index}
        ItemSeparatorComponent={() => <View></View>}
        renderItem={product => {
          return (
            <ProductFeed
              onPress={() => {
                try {
                  navigation.navigate('ProductScreen', {
                    product: product.item,
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
              product={product}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};
