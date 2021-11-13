import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  LogBox,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';
import firestore from '@react-native-firebase/firestore';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Constants from '../../constants/PhoneDimentions';
import Swiper from 'react-native-swiper';
import DropDownPicker from 'react-native-dropdown-picker';
import {Rating, AirbnbRating} from 'react-native-ratings';

export default ProductScreen = props => {
  // _________ Props and Hooks _________

  const {navigation, route} = props;
  const {theme, themeColors} = useContext(ThemeContext);
  const [product, setProduct] = useState(route.params.product);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState(false);
  const [rating, setRating] = useState(0);
  // console.log('ratting : ', rating);

  // _________ Colors Dropdown hooks _________
  const [colorDDopen, setColorDDOpen] = useState(false);
  const [color, setColor] = useState(product.colors[0]);
  const [colorDDitems, setColorDDItems] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Prodcut Details',
    });
  });

  useEffect(() => {
    getColorsArray();
    setRating(product.rating / product.totalReviews);
    // LogBox.ignoreLogs([
    //   'Non-serializable values were found in the navigation state',
    // ]);

    // addReview(5, 'very good', userID, product);
  }, []);

  // _________ Fetches _________
  userID = auth().currentUser.uid;

  // _________ functions _________
  // getting the available colors for the dropdown
  getColorsArray = () => {
    let colorsArray = [];
    product.colors.map((color, index) => {
      key = color;
      colorsArray.push({label: color, value: color});
      setColorDDItems(colorsArray);
    });
  };
  // adding review
  addReview = async (enteredRating, review, userID, product) => {
    let newRating = product.rating + enteredRating;
    let newTotalReviews = product.totalReviews + 1;
    try {
      await firestore()
        .collection('products')
        .doc(product.key)
        .update({
          reviews: firestore.FieldValue.arrayUnion({
            key: userID,
            rating: enteredRating,
            review: review,
            reviewDate: new Date().toUTCString(),
          }),
        })
        .then(
          await firestore().collection('products').doc(product.key).update({
            rating: newRating,
            totalReviews: newTotalReviews,
          }),
        );
    } catch (error) {
      console.log(error);
    }
  };

  // _________ Styles _________
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: themeColors.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: themeColors.background,
      alignContent: 'center',
    },
    swiperContainer: {
      // borderWidth: 1,
      // borderColor: themeColors.border,
      // borderRadius: 10,
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
  });

  return (
    <ScrollView
      style={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={{paddingBottom: 100}}>
        <Text style={styles.textTitle} numberOfLines={3}>
          {product.productName}
        </Text>
        <View // Image Swiper View
          style={styles.swiperContainer}>
          <Swiper loop={true} showsButtons={false}>
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
          style={{paddingLeft: 10, marginBottom: 10}}>
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
          <Text style={styles.textHeader}>Size: </Text>
          <Text numberOfLines={1} style={styles.text}>
            {product.size}
          </Text>
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

        <View // Colors View
          style={{
            paddingLeft: 10,
            marginBottom: 10,
            flexDirection: 'row',
            width: Constants.screenWidth,
            height: Constants.screenHeight * 0.03,
            alignContent: 'center',
          }}>
          <Text style={styles.textHeader}>Availabel Colors: </Text>
          <DropDownPicker
            placeholder={product.colors[0]}
            style={styles.dropDown}
            theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
            open={colorDDopen}
            value={color}
            items={colorDDitems}
            setOpen={setColorDDOpen}
            setValue={setColor}
            setItems={setColorDDItems}
            onChangeValue={() => {
              setEdited(true);
            }}
            dropDownDirection="AUTO"
            bottomOffset={100}
            listMode="SCROLLVIEW"
            textStyle={{fontSize: RFPercentage(2)}}
          />
        </View>

        <AirbnbRating
          count={5}
          defaultRating={rating}
          size={RFPercentage(3)}
          isDisabled={true}
          minValue={1}
        />
      </SafeAreaView>
    </ScrollView>
  );
};
