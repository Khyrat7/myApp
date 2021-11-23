import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';

export default function SearchScreen(props) {
  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
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

  const Styles = StyleSheet.create({});

  return (
    <View style={{backgroundColor: themeColors.background, flex: 1}}>
      <Text></Text>
    </View>
  );
}
