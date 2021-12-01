import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import Card from './Card';

export default CartCard = props => {
  // Props and Hooks

  const {handleCardPressed, product} = props;
  const {themeColors} = useContext(ThemeContext);

  // Styles
  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: Constants.screenHeight * 0.5,
      marginHorizontal: 50,
    },
    textContainer: {
      paddingLeft: 10,
      marginBottom: 15,
    },
    textHeader: {
      fontWeight: 'bold',
      fontSize: RFPercentage(2),
      color: themeColors.titleFont,
    },
    text: {
      width: 300,
      fontSize: RFPercentage(2),
      color: themeColors.mainFont,
      marginLeft: 5,
    },
    textTitle: {
      fontSize: RFPercentage(2),
      fontWeight: 'bold',
      color: themeColors.mainFont,
      textAlign: 'center',
      marginVertical: 10,
      marginHorizontal: 10,
    },
    headerButton: {
      alignSelf: 'flex-end',
      paddingHorizontal: 10,
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'space-around',
      backgroundColor: themeColors.buttonColor,
      marginVertical: 10,
      marginHorizontal: 10,
      paddingVertical: 15,
    },
    buttonText: {
      textAlign: 'center',
      color: themeColors.headerFont,
    },
    separator: {
      alignSelf: 'center',
      width: '100%',
      borderColor: themeColors.border,
      borderWidth: 0.4,
      height: 1,
      marginBottom: 10,
    },
  });
  return (
    <TouchableOpacity
      onPress={() => {
        handleCardPressed(product);
      }}>
      <Card style={{overflow: 'hidden', ...props.style}}>
        <Text style={styles.textTitle} numberOfLines={1}>
          {product.productName}
        </Text>

        <View style={styles.separator}></View>

        <View // Delivery Status View
          style={{...styles.textContainer, flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Status: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.orderDetails.deliveryStatus}
          </Text>
        </View>

        <View // Price View
          style={{...styles.textContainer, flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Price: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.price + ' EGP'}
          </Text>
        </View>

        <View // Number of items View
          style={{...styles.textContainer, flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Number of Items: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.orderDetails.numberOfItems}
          </Text>
        </View>

        <View // selected color View
          style={{...styles.textContainer, flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Selected Color: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.orderDetails.color}
          </Text>
        </View>

        <View // Shipping address View
          style={{...styles.textContainer, flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Shipping Address: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.orderDetails.deliveryAddress}
          </Text>
        </View>

        <View // Note View
          style={{...styles.textContainer, flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Note: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.orderDetails.note}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
