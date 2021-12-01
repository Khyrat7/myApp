import React, {
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

//
//_________ Redux imports _________
import {useSelector, useDispatch} from 'react-redux';
import * as favoritActions from '../../store/actions/favoritActions';
import * as cartActions from '../../store/actions/cartActions';

import CustomHeaderButton from '../components/HeaderButton';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import FavoritCard from '../components/FavoritCard';

export default function FavoritScreen(props) {
  const dispatch = useDispatch();
  const favorits = useSelector(state => state.favorit);
  const cartItems = useSelector(state => state.cart.cartItems);

  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

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

  // _____________ Functions ____________

  const getFavoritData = useCallback(() => {
    setIsRefresh(true);
    try {
      dispatch(favoritActions.getFavoritProducts());
    } catch (error) {
      console.log(error);
    }
    setIsRefresh(false);
  }, [navigation]);

  const getCartIcon = productKey => {
    const existingIndex = cartItems.findIndex(prod => prod.key === productKey);
    if (existingIndex >= 0) {
      return 'cart-off';
    } else {
      return 'cart-arrow-right';
    }
  };

  // _____________ Styles ____________

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: themeColors.background,
    },
    emptyFavorits: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.background,
    },
    text: {
      textAlign: 'center',
      color: themeColors.mainFont,
      fontSize: RFPercentage(3),
    },
  });

  if (favorits.length === 0) {
    return (
      <View style={styles.emptyFavorits}>
        <Text style={styles.text}>
          No Favorit Items is Selected. Start adding products
        </Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{backgroundColor: themeColors.background, flex: 1}}>
        {isLoading ? (
          <View
            style={{paddingVertical: 10, backgroundColor: themeColors.header}}>
            <ActivityIndicator size="large" color={themeColors.headerFont} />
          </View>
        ) : null}
        <FlatList
          onRefresh={getFavoritData}
          refreshing={isRefresh}
          data={favorits}
          ItemSeparatorComponent={() => <View></View>}
          renderItem={product => {
            return (
              <FavoritCard
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
                toggleCartPress={async () => {
                  setIsLoading(true);
                  await dispatch(cartActions.toggleProductToCart(product.item));
                  await dispatch(cartActions.getCartProducts());
                  await dispatch(cartActions.getCartTotals());
                  setIsLoading(false);
                }}
                removeFavoritPress={async () => {
                  setIsLoading(true);
                  await dispatch(
                    favoritActions.toggleProductToFavorit(product.item),
                  );
                  setIsLoading(false);
                }}
                cartIcon={getCartIcon(product.item.key)}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
