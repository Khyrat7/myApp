import React, {useContext, useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';
import firestore from '@react-native-firebase/firestore';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import Card from './Card';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';

export default ProductFeed = props => {
  // Props and Hooks
  const {onPress, product, key} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  const [sellerImage, setSellerImage] = useState('');
  const [sellerName, setSellerName] = useState('');
  const sellerID = product.item.sellerID;

  useEffect(() => {
    getSellerData(sellerID);
  }, [product.sellerID]);

  const getSellerData = useCallback(async sellerID => {
    try {
      await firestore()
        .collection('users')
        .doc(sellerID)
        .get()
        .then(document => {
          setSellerImage(document.data().imageURL);
          setSellerName(document.data().name);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Styles
  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
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
    headerContainer: {
      flexDirection: 'row',
      alignContent: 'center',
      paddingHorizontal: 10,
      width: '100%',
      // justifyContent: 'center',
      marginVertical: 10,
    },
    sellerImage: {
      height: Constants.screenHeight * 0.05,
      width: Constants.screenHeight * 0.05,
      borderRadius: Constants.screenHeight * 0.025,
      borderColor: themeColors.border,
      borderWidth: 1,
    },
    headerName: {
      paddingHorizontal: 10,
      fontWeight: 'bold',
      color: themeColors.mainFont,
      fontSize: RFPercentage(3),
    },

    separator: {
      alignSelf: 'center',
      width: '100%',
      borderColor: themeColors.border,
      borderWidth: 0.4,
      height: 1,
      marginVertical: 5,
    },
  });

  return (
    <Card>
      <View style={styles.headerContainer}>
        <Image
          style={styles.sellerImage}
          source={sellerImage ? {uri: sellerImage} : Images.defaultUserPhoto}
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.headerName}>{sellerName}</Text>
        </View>
      </View>
      <View style={styles.separator}></View>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textTitle} numberOfLines={3}>
          {product.item.productName}
        </Text>
      </TouchableOpacity>

      <View // Image Swiper View
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          height: Constants.screenHeight * 0.22,
        }}>
        <Swiper
          dot={
            <View
              style={{
                backgroundColor:
                  theme === 'dark' ? Colors.Darkgray : Colors.lightGray,
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor:
                  theme === 'dark' ? Colors.white : themeColors.buttonColor,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          paginationStyle={{
            bottom: -25,
            left: 10,
            right: 10,
          }}
          loop>
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
          style={{paddingLeft: 10, marginBottom: 10, marginTop: 20}}>
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
    </Card>
  );
};
