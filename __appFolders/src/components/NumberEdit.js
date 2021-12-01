import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import Card from './Card';
import Colors from '../../constants/Colors';

export default NumberEdit = props => {
  // Props and Hooks
  const {AddOnPress, SubOnPress, number} = props;
  const {themeColors} = useContext(ThemeContext);

  // Styles
  const styles = StyleSheet.create({
    cardContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: themeColors.buttonColor,
      color: themeColors.headerFont,
    },
    button: {
      paddingHorizontal: RFPercentage(2),
      color: themeColors.headerFont,
    },
    numberText: {
      color: themeColors.headerFont,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={{...styles.cardContainer, ...props.style}}>
      <Card style={styles.card}>
        <TouchableOpacity onPress={SubOnPress}>
          <Text style={styles.button}> - </Text>
        </TouchableOpacity>
        <Text style={styles.numberText}>{number}</Text>

        <TouchableOpacity onPress={AddOnPress}>
          <Text
            style={{
              ...styles.button,
            }}>
            +
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};
