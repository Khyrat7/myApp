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
import * as ordersActions from '../../store/actions/ordersActions';

import CustomHeaderButton from '../components/HeaderButton';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import OrederCard from '../components/OrederCard';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function OrdersScreen(props) {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.allOrders);
  const userProfile = useSelector(state => state.user);

  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

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
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      //     <Item
      //       title="Cart"
      //       iconSize={23}
      //       iconName="cart-outline"
      //       onPress={() => navigation.navigate('CartScreen')}
      //     />
      //   </HeaderButtons>
      // ),
    });
  });

  // _____________ Functions ____________

  const getOrdersData = useCallback(() => {
    setIsRefresh(true);
    try {
      dispatch(ordersActions.getOrdersProduct(userProfile.userID));
    } catch (error) {
      console.log(error);
    }
    setIsRefresh(false);
  }, [navigation]);

  const handleCardPressed = async product => {
    try {
      await dispatch(ordersActions.setOrderItemSuccess(product));
      navigation.navigate('OrderDetails');
    } catch (e) {
      console.log(e);
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

  if (orders.length === 0) {
    return (
      <View style={styles.emptyFavorits}>
        <Text style={styles.text}>No Previous orders. Start Adding.</Text>
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
        <View style={styles.container}>
          <FlatList
            onRefresh={getOrdersData}
            refreshing={isRefresh}
            data={orders}
            ItemSeparatorComponent={() => <View></View>}
            renderItem={order => {
              key = order.item.orderDate;
              return (
                <OrederCard
                  style={{overflow: 'hidden'}}
                  key={order.item.orderDate}
                  order={order}
                  handleCardPressed={handleCardPressed}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
