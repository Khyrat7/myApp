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

import CustomHeaderButton from '../../components/HeaderButton';
import {ThemeContext} from '../../../context/LayoutContext';

export default function AdminAddProduct(props) {
  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  });

  // _____________ Functions ____________

  // _____________ Styles ____________

  const styles = StyleSheet.create({});

  return (
    <View></View>
    // <SafeAreaView style={{backgroundColor: themeColors.background, flex: 1}}>
    //   {isLoading ? (
    //     <View
    //       style={{paddingVertical: 10, backgroundColor: themeColors.header}}>
    //       <ActivityIndicator size="large" color={themeColors.headerFont} />
    //     </View>
    //   ) : null}
    //   <View style={styles.container}>
    //     <FlatList
    //       onRefresh={getOrdersData}
    //       refreshing={isRefresh}
    //       data={orders}
    //       ItemSeparatorComponent={() => <View></View>}
    //       renderItem={order => {
    //         key = order.item.orderDate;
    //         return (
    //           <OrederCard
    //             style={{overflow: 'hidden'}}
    //             key={order.item.orderDate}
    //             order={order}
    //             handleCardPressed={handleCardPressed}
    //           />
    //         );
    //       }}
    //     />
    //   </View>
    // </SafeAreaView>
  );
}
