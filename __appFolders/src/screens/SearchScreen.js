import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';

export default function SearchScreen(props) {
  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  const Styles = StyleSheet.create({});

  return (
    <View style={{backgroundColor: themeColors.background, flex: 1}}>
      <Text></Text>
    </View>
  );
}
