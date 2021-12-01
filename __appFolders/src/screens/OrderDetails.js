import React, {
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Swiper from 'react-native-swiper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

// Redux imports
import {useDispatch, useSelector} from 'react-redux';
import * as productActions from '../../store/actions/productActions';
import * as cartActions from '../../store/actions/cartActions';
import * as favoritActions from '../../store/actions/favoritActions';

//
//
// Custom imports
import {ThemeContext} from '../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Constants from '../../constants/PhoneDimentions';
import CustomHeaderButton from '../components/HeaderButton';
import LoginButton from '../components/LoginButton';
import ReviewCard from '../components/ReviewCard';
import ColorCard from '../components/ColorCard';
import Colors from '../../constants/Colors';
import Card from '../components/Card';
import {formatDateLong} from '../../modules/DateModule';

export default EditOrderScreen = props => {
  Icon.loadFont();

  // _____________ Redux Hooks & State _____________
  const dispatch = useDispatch();
  const order = useSelector(state => state.orders.orderItem);

  // _________ Props and Hooks _________

  const {navigation, route} = props;
  const {theme, themeColors} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState('');

  // __________________ Styles __________________
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: themeColors.background,
    },
    scrollView: {
      backgroundColor: themeColors.background,
      alignContent: 'center',
    },
    swiperContainer: {
      marginHorizontal: 5,
      marginVertical: 10,
      height: Constants.screenHeight * 0.5,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '90%',
      height: '100%',
    },
    textHeader: {
      fontWeight: 'bold',
      fontSize: RFPercentage(2),
      color: themeColors.titleFont,
      marginBottom: 10,
    },
    text: {
      // width: '95%',
      fontSize: RFPercentage(2),
      color: themeColors.mainFont,
      marginLeft: 10,
      marginRight: 10,
    },
    textTitle: {
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      textAlign: 'center',
      color: themeColors.mainFont,
      marginTop: 10,
    },
    dropDown: {
      height: '100%',
      width: Constants.screenWidth * 0.2,
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: Constants.screenHeight * 0.01,
      color: themeColors.mainFont,
      backgroundColor: themeColors.fieldColor,
      fontSize: RFPercentage(2),
      marginLeft: 10,
    },
    colorCard: {
      height: 20,
      width: 20,
      borderRadius: 10,
      flexDirection: 'row',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
    textInput: {
      borderWidth: 1,
      borderColor: themeColors.border,
      width: '50%',
      marginRight: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      paddingVertical: 4,
      fontSize: RFPercentage(2),
    },
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: themeColors.background,
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      // <View style={styles.container}></View>
      <ScrollView
        style={styles.scrollView}
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{paddingBottom: 100}}>
          <Text // Product Name
            style={styles.textTitle}
            numberOfLines={3}>
            {order.productName}
          </Text>

          <View // Image Swiper View
            style={styles.swiperContainer}>
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
              {order.photos.map((image, index) => {
                return (
                  <View style={styles.slide} key={index}>
                    <Image source={{uri: image}} style={styles.image} />
                  </View>
                );
              })}
            </Swiper>
          </View>

          <View // order date
            style={{
              paddingLeft: 10,
              marginBottom: 10,
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <Text style={styles.textHeader}>Ordered on: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {formatDateLong(order.toOrdersDate)}
            </Text>
          </View>

          <View // Delivery Status View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Status: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {order.orderDetails.deliveryStatus}
            </Text>
          </View>

          <View // Price View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Price: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {order.price + ' EGP'}
            </Text>
          </View>

          <View // Number Of Items
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Number of Items: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {order.orderDetails.numberOfItems}
            </Text>
          </View>

          <View // Size View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Size: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {order.orderDetails.size}
            </Text>
          </View>

          <View // Colors View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Color: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {order.orderDetails.color}
            </Text>
          </View>

          <View // Note View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Note: </Text>
            <Text numberOfLines={3} style={styles.text}>
              {order.orderDetails.note}
            </Text>
          </View>

          <View // Shipping address View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Shipping Address: </Text>
            <Text numberOfLines={3} style={styles.text}>
              {order.orderDetails.deliveryAddress}
            </Text>
          </View>

          <View // Delivery Time View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Delevery Time: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {order.deliveryTime}
            </Text>
          </View>

          <View // Description View
            style={{paddingLeft: 10, marginBottom: 10}}>
            <Text style={styles.textHeader}>Description: </Text>
            <Text numberOfLines={12} style={styles.text}>
              {order.description}
            </Text>
          </View>

          <View // Category View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Category: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {order.category}
            </Text>
          </View>

          {/* <LoginButton // Save Button
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={handleSavePressed}
            title={
              updatingData ? (
                <Text>
                  <ActivityIndicator size="small" />
                </Text>
              ) : (
                <Text style={{textAlign: 'center'}}>
                  Save <Icon name="content-save" size={RFPercentage(3)} />
                </Text>
              )
            }
          /> */}
        </SafeAreaView>
      </ScrollView>
    );
  }
};
