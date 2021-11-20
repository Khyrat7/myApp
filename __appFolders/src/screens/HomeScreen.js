import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';

import {ThemeContext} from '../../context/LayoutContext';
import ProductFeed from '../components/ProductFeed';
import HeaderButton from '../components/HeaderButton';

export default HomeScreen = props => {
  // _____ Props and Hooks _____
  const {navigation} = props;
  const {themeColors} = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const products = useSelector(state => state.products);

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
            // iconName="star"
            iconName="file-tray-stacked-outline"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
            iconName="cart-outline"
            onPress={() => navigation.navigate('CartScreen')}
          />
        </HeaderButtons>
      ),
    });
  });

  // _____ Styles _____
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
