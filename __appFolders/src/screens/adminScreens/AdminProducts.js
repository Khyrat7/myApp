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
import * as adminActions from '../../../store/actions/adminActions';

import {ThemeContext} from '../../../context/LayoutContext';
import CustomHeaderButton from '../../components/HeaderButton';
import ProductCard from '../../components/ProductCard';

export default AdminProducts = props => {
  const userID = auth().currentUser.uid;

  const products = useSelector(state => state.admin.allProducts);
  const dispatch = useDispatch();

  // _____ Props and Hooks _____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);
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
            title="Add"
            iconSize={23}
            iconName="plus-outline"
            onPress={() => navigation.navigate('AdminAddProduct')}
          />
        </HeaderButtons>
      ),
    });
  });

  useEffect(() => {
    dispatch(adminActions.getAdminOrders(userID));
  }, []);

  // _____ Styles _____
  const styles = StyleSheet.create({
    container: {},
  });

  const getProductsData = async () => {
    setIsRefresh(true);
    await dispatch(adminActions.getAdminProducts(userID));
    await dispatch(adminActions.getAdminOrders(userID));
    setIsRefresh(false);
  };

  return (
    // <View></View>
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
                  navigation.navigate('AdminProductScreen', {
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
};
