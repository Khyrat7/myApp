import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import Card from './Card';
import OrderSubCard from './OrderSubCard';
import {formatDateLong, formatNormalDate} from '../../modules/DateModule';

export default OrderCard = props => {
  Icon.loadFont();

  // Props and Hooks
  const {handleCardPressed, order} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  const handlePress = () => {};

  // Styles
  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      shadowColor: themeColors.border,
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
        width: 2,
        height: 5,
      },
      marginHorizontal: 10,
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
      color: themeColors.headerFont,
      marginLeft: 5,
    },
    textTitle: {
      fontSize: RFPercentage(2),
      fontWeight: 'bold',
      color: themeColors.headerFont,
      marginTop: 10,
      paddingHorizontal: 10,
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
      borderTopColor: themeColors.border,
      borderTopWidth: 0.4,
      height: 1,
    },
    orderSubCard: {
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
  });

  return (
    <View style={styles.mainView}>
      <Card style={{overflow: 'hidden'}}>
        <View style={{backgroundColor: themeColors.header, paddingBottom: 10}}>
          <Text style={styles.textTitle} numberOfLines={3}>
            Ordered Date:{'   '} {formatNormalDate(order.item.orderDate)}
          </Text>

          <Text style={styles.textTitle} numberOfLines={3}>
            Total Items:{'   '} {order.item.totalItems}
          </Text>

          <Text style={styles.textTitle} numberOfLines={3}>
            Total price:{'   '} {order.item.totalPrice}
          </Text>
        </View>
        <View style={styles.separator}></View>

        {order.item.ordersArray.map((element, index) => {
          return (
            <OrderSubCard
              style={styles.orderSubCard}
              product={element}
              key={element.key}
              handleCardPressed={handleCardPressed}
            />
          );
        })}
      </Card>
    </View>
  );
};
