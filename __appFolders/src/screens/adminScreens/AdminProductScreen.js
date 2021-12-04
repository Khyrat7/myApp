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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Swiper from 'react-native-swiper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux imports
import {useDispatch, useSelector} from 'react-redux';
import * as productActions from '../../../store/actions/productActions';

//
//
// Custom imports
import {ThemeContext} from '../../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Constants from '../../../constants/PhoneDimentions';
import CustomHeaderButton from '../../components/HeaderButton';
import LoginButton from '../../components/LoginButton';
import ReviewCard from '../../components/ReviewCard';
import ColorCard from '../../components/ColorCard';
import Colors from '../../../constants/Colors';

export default ProductScreen = props => {
  Icon.loadFont();

  // _____________ Redux Hooks & State _____________
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  // _________ Props and Hooks _________

  const {navigation, route, key} = props;
  const productID = route.params.key;
  const {theme, themeColors} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Prodcut Details',
    });
  });

  useEffect(() => {
    getProductData(productID);
  }, [productID, getProductData]);

  // _________ Fetches _________
  const productReviews = product.reviews;
  // _________ functions _________

  // getting the product data
  const getProductData = useCallback(
    async productID => {
      setIsLoading(true);
      try {
        await dispatch(productActions.getProductData(productID));
        // await dispatch(
        //   productActions.addReview(productID, 4, 'dfsdfsadfsa', userProfile),
        // );
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    },
    [productID, dispatch],
  );

  // Get Sizes string
  const getSizesString = () => {
    const sizes = product.sizes;
    let sizesString = '';
    for (let index = 0; index < sizes.length; index++) {
      const element = sizes[index];
      const lastElement = sizes.length - 1;
      {
        index === lastElement
          ? (sizesString = sizesString + element)
          : (sizesString = sizesString + element + ' - ');
      }
    }

    return sizesString;
  };

  // _________ Styles _________
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
      width: '95%',
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
      width: Constants.screenWidth * 0.5,
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
          <Text style={styles.textTitle} numberOfLines={3}>
            {product.productName}
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
              {product.photos.map((image, index) => {
                return (
                  <View style={styles.slide} key={index}>
                    <Image source={{uri: image}} style={styles.image} />
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View // Description View
            style={{paddingLeft: 10, marginBottom: 10, marginTop: 20}}>
            <Text style={styles.textHeader}>Description: </Text>
            <Text numberOfLines={12} style={styles.text}>
              {product.description}
            </Text>
          </View>
          <View // Price View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Price: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {product.price + ' EGP'}
            </Text>
          </View>
          <View // Category View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Category: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {product.category}
            </Text>
          </View>
          <View // Size View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Sizes: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {getSizesString()}
            </Text>
          </View>

          <View // Colors View
            style={{
              paddingLeft: 10,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.textHeader}>Colors: </Text>
            {product.colors.map(element => {
              return (
                <ColorCard
                  style={styles.colorCard}
                  color={element}
                  key={element}
                />
              );
            })}
          </View>

          <View // Delivery Time View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Delevery Time: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {product.deliveryTime}
            </Text>
          </View>

          <View // Total Reviews View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Total Reviews: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {product.totalReviews}
            </Text>
          </View>
          <AirbnbRating // Rating
            count={5}
            defaultRating={product.rating / product.totalReviews}
            size={RFPercentage(3)}
            isDisabled={true}
            minValue={1}
            showRating={false}
          />

          <View style={{paddingVertical: 20}}>
            {product.reviews.map((element, index) => {
              return <ReviewCard review={element} key={index} />;
            })}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
};
