import React, {useLayoutEffect, useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import firestore from '@react-native-firebase/firestore';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';

export default ProductFeed = props => {
  // Props and Hooks
  const {onPress, product} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  // Styles
  const styles = StyleSheet.create({
    container1: {
      marginTop: 10,
      flex: 1,
      width: '95%',
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: 10,
      // justifyContent: 'space-between',
      backgroundColor: themeColors.background,
      marginBottom: 20,
    },
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
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      textAlign: 'center',
      color: themeColors.mainFont,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container1}>
      <Text style={styles.textTitle} numberOfLines={3}>
        {product.item.productName}
      </Text>
      <View // Image Swiper View
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          height: Constants.screenHeight * 0.22,
        }}>
        <Swiper loop={true} showsButtons={false}>
          {product.item.photos.map((image, index) => {
            return (
              <View style={styles.slide} key={index}>
                <Image source={{uri: image}} style={styles.image} />
              </View>
            );
          })}
        </Swiper>
      </View>

      <TouchableOpacity onPress={onPress}>
        <View // Description View
          style={{paddingLeft: 10, marginBottom: 10}}>
          <Text style={styles.textHeader}>Description: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.item.description}
          </Text>
        </View>

        <View // Price View
          style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Price: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.item.price + ' EGP'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
