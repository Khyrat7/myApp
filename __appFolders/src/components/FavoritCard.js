import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import Card from './Card';

export default FavoritCard = props => {
  Icon.loadFont();

  // Props and Hooks
  const {onPress, product, cartIcon, removeFavoritPress, toggleCartPress} =
    props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

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
    buttonSection: {
      flexDirection: 'row',
      height: 30,
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      height: '100%',
      width: '30%',
      backgroundColor: themeColors.buttonColor,
      alignContent: 'center',
      justifyContent: 'center',
      marginRight: '10%',
      marginLeft: '10%',
      borderRadius: 10,
    },
    buttonText: {
      color: themeColors.mainFont,
      textAlign: 'center',
      color: themeColors.headerFont,
    },
    separator: {
      alignSelf: 'center',
      width: '100%',
      borderColor: themeColors.border,
      borderWidth: 0.4,
      height: 1,
    },
  });

  return (
    <Card>
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
      <View style={styles.separator}></View>

      <View /// Buttons section
        style={styles.buttonSection}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={removeFavoritPress}>
            <Text style={styles.buttonText}>
              <Icon name="heart-off" size={RFPercentage(3)} />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleCartPress}>
            <Text style={styles.buttonText}>
              <Icon name={cartIcon} size={RFPercentage(3)} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};
