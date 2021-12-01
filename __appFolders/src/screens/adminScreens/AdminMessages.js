import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {ThemeContext} from '../../../context/LayoutContext';
import CustomHeaderButton from '../../components/HeaderButton';

export default function AdminMessages(props) {
  // ____ Props & Hooks ____

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

  const Styles = StyleSheet.create({});

  return (
    <View style={{backgroundColor: themeColors.background, flex: 1}}>
      <Text></Text>
    </View>
  );
}
