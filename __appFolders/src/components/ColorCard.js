import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import Card from './Card';
import Colors from '../../constants/Colors';

export default ColorCard = props => {
  // Props and Hooks
  const {onPress, color} = props;

  const getColor = colorText => {
    switch (colorText) {
      case 'red':
        return Colors.red;

      case 'orange':
        return Colors.orange;
      case 'black':
        return Colors.black;
      case 'blue':
        return Colors.blue;
      case 'white':
        return Colors.white;
      case 'green':
        return Colors.green;
      case 'brown':
        return Colors.brown;

      default:
        Colors.white;
    }
  };

  // Styles
  const styles = StyleSheet.create({
    card: {
      backgroundColor: getColor(color),
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{...styles.card, ...props.style}}></Card>
    </TouchableOpacity>
  );
};
