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

import {ThemeContext} from '../../../context/LayoutContext';
import CustomHeaderButton from '../../components/HeaderButton';

export default AdminProducts = props => {
  const products = useSelector(state => state.products.allProducts);
  const dispatch = useDispatch();

  // _____ Props and Hooks _____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

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
            title="Add"
            iconSize={23}
            iconName="plus-outline"
            onPress={() => navigation.navigate('AdminAddProduct')}
          />
        </HeaderButtons>
      ),
    });
  });

  // useEffect(() => {
  //   setIsLoading(true);
  //   getProductsData();
  //   setIsLoading(false);
  // }, [dispatch]);

  // // _____ Functions _____

  // const getProductsData = useCallback(() => {
  //   setIsRefresh(true);
  //   try {
  //     dispatch(userActions.getUserProfile(userID));
  //     dispatch(productsActions.getHomeProducts());
  //     dispatch(cartActions.getCartProducts());
  //     dispatch(cartActions.getCartTotals());
  //     dispatch(favoritActions.getFavoritProducts());
  //     dispatch(ordersActions.getOrdersProducts(userID));
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsRefresh(false);
  // }, [navigation]);

  // _____ Styles _____
  const styles = StyleSheet.create({
    container: {},
  });

  return (
    <View></View>
    // <SafeAreaView style={{backgroundColor: themeColors.background, flex: 1}}>
    //   <FlatList
    //     onRefresh={getProductsData}
    //     refreshing={isRefresh}
    //     data={products}
    //     ItemSeparatorComponent={() => <View></View>}
    //     renderItem={product => {
    //       return (
    //         <ProductCard
    //           onPress={() => {
    //             try {
    //               navigation.navigate('ProductScreen', {
    //                 key: product.item.key,
    //               });
    //             } catch (error) {
    //               console.log(error);
    //             }
    //           }}
    //           product={product}
    //         />
    //       );
    //     }}
    //   />
    // </SafeAreaView>
  );
};
