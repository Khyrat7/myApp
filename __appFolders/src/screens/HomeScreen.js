import React, {
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import auth from '@react-native-firebase/auth';
//
//_________ Redux imports _________
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/productsActions';
import * as cartActions from '../../store/actions/cartActions';
import * as favoritActions from '../../store/actions/favoritActions';
import * as userActions from '../../store/actions/userActions';
import * as ordersActions from '../../store/actions/ordersActions';
import * as AdminActions from '../../store/actions/adminActions';

import {ThemeContext} from '../../context/LayoutContext';
import ProductCard from '../components/ProductCard';
import CustomHeaderButton from '../components/HeaderButton';

export default HomeScreen = props => {
  const products = useSelector(state => state.products.allProducts);
  const dispatch = useDispatch();

  // _____ Props and Hooks _____
  const {navigation} = props;
  const {themeColors} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  const userID = auth().currentUser.uid;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconSize={23}
            iconName="notification-clear-all"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconSize={23}
            iconName="cart-outline"
            onPress={() => navigation.navigate('CartScreen')}
          />
        </HeaderButtons>
      ),
    });
  });

  useEffect(() => {
    setIsLoading(true);
    getProductsData();
    setIsLoading(false);
  }, [dispatch]);

  // _____ Functions _____

  const getProductsData = useCallback(() => {
    setIsRefresh(true);
    try {
      dispatch(userActions.getUserProfile(userID));
      dispatch(productsActions.getHomeProducts());
      dispatch(cartActions.getCartProducts());
      dispatch(cartActions.getCartTotals());
      dispatch(favoritActions.getFavoritProducts());
      dispatch(ordersActions.getOrdersProducts(userID));
      dispatch(AdminActions.getAdminProducts(userID));
    } catch (error) {
      console.log(error);
    }
    setIsRefresh(false);
  }, [navigation]);

  // _____ Styles _____
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: themeColors.background,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={themeColors.black} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{backgroundColor: themeColors.background, flex: 1}}>
        <FlatList
          onRefresh={getProductsData}
          refreshing={isRefresh}
          data={products}
          ItemSeparatorComponent={() => <View></View>}
          renderItem={product => {
            return (
              <ProductCard
                onPress={() => {
                  try {
                    navigation.navigate('ProductScreen', {
                      key: product.item.key,
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
  }
};
