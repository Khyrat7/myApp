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
import * as ordersActions from '../../store/actions/ordersActions';

import CustomHeaderButton from '../components/HeaderButton';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import CartCard from '../components/CartCard';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const favorits = useSelector(state => state.favorit);
  const cart = useSelector(state => state.cart);
  const userProfile = useSelector(state => state.user);

  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingData, setUpdatingData] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'My Cart',
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      //     <Item
      //       title="Home"
      //       iconSize={23}
      //       iconName={inFavorit ? 'heart-off' : 'heart-outline'}
      //       onPress={handleFavoritPressed}
      //     />
      //   </HeaderButtons>
      // ),
    });
  });

  // _____________ Functions ____________

  const handleEditPressed = async product => {
    try {
      await dispatch(cartActions.getCartProduct(product.item.key));
      navigation.navigate('EditOrderScreen', {
        key: product.item.key,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOutPressed = async () => {
    try {
      setUpdatingData(true);
      await dispatch(
        ordersActions.setNewOrder(
          cart.cartItems,
          cart.cartTotalPrice,
          cart.cartTotalItems,
        ),
      );
      await dispatch(ordersActions.getOrdersProducts(userProfile.userID));
      await await dispatch(cartActions.getCartProducts());
    } catch (error) {
      console.log(error);
    }
    setUpdatingData(false);
  };

  // _____________ Styles ____________

  const styles = StyleSheet.create({
    headerContainer: {
      height: '12%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      marginVertical: 10,
      marginHorizontal: 10,
      alignItems: 'center',
    },
    headerText: {
      fontSize: RFPercentage(2.2),
      fontWeight: 'bold',
      marginVertical: 10,
      color: themeColors.mainFont,
    },
    headerButton: {
      alignSelf: 'flex-end',
      paddingHorizontal: 10,
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'space-around',
      backgroundColor: themeColors.buttonColor,
      marginVertical: 10,
      marginHorizontal: 10,
      paddingVertical: 15,
    },
    buttonText: {
      textAlign: 'center',
      color: themeColors.headerFont,
    },
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
      marginHorizontal: 20,
    },
    separator: {
      alignSelf: 'center',
      width: '100%',
      borderColor: themeColors.border,
      borderWidth: 0.4,
      height: 1,
    },
  });

  if (cart.cartItems.length === 0 || isLoading) {
    return (
      <View style={styles.emptyFavorits}>
        <Text style={styles.text}>
          No Items is in your shopping Cart. Start adding products
        </Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{backgroundColor: themeColors.background, flex: 1}}>
        {updatingData ? <ActivityIndicator size="large" /> : null}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>
              Total Price:{'   '} {cart.cartTotalPrice} {'   '}EGP.
            </Text>
            <Text style={styles.headerText}>
              Total Items:{'   '} {cart.cartTotalItems}
            </Text>
          </View>
          <TouchableOpacity // Header Button
            onPress={handleCheckOutPressed}>
            <View style={styles.headerButton}>
              <Text style={styles.buttonText}>Check Out</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}></View>

        <FlatList
          // onRefresh={getCartData}
          // refreshing={isRefresh}
          data={cart.cartItems}
          ItemSeparatorComponent={() => <View></View>}
          renderItem={product => {
            key = product.item.key;
            return (
              <CartCard
                onPress={() => {
                  handleEditPressed(product);
                }}
                product={product}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
