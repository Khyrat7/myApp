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
import {useSelector, useDispatch} from 'react-redux';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';

import {ThemeContext} from '../../context/LayoutContext';
import ProductFeed from '../components/ProductFeed';
import CustomHeaderButton from '../components/HeaderButton';
import * as productsActions from '../../store/actions/productsActions';

export default HomeScreen = props => {
  // _____ Props and Hooks _____
  const {navigation} = props;
  const {themeColors} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const products = useSelector(state => state.products);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconSize={23}
            iconName="file-tray-stacked-outline"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconSize={23}
            iconName="cart-outline"
            onPress={() => navigation.navigate('CartScreen')}
          />
        </HeaderButtons>
      ),
    });
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getProductsData();
    setIsLoading(false);
  }, [dispatch]);

  // _____ Functions _____

  const getProductsData = useCallback(() => {
    setIsRefresh(true);
    try {
      dispatch(productsActions.getHomeProducts());
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
      <SafeAreaView style={{backgroundColor: themeColors.background}}>
        <FlatList
          onRefresh={getProductsData}
          refreshing={isRefresh}
          data={products}
          ItemSeparatorComponent={() => <View></View>}
          renderItem={product => {
            return (
              <ProductFeed
                onPress={() => {
                  // console.log(product.item.key);
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
