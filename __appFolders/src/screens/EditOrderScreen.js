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
import NumberEdit from '../components/NumberEdit';
import {add, color} from 'react-native-reanimated';

export default EditOrderScreen = props => {
  Icon.loadFont();

  // _____________ Redux Hooks & State _____________
  const dispatch = useDispatch();
  const product = useSelector(state => state.cart.cartProduct);
  const favorit = useSelector(state => state.favorit);

  // _________ Props and Hooks _________

  const {navigation, route} = props;
  const productID = route.params.key;
  const {theme, themeColors} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingData, setUpdatingData] = useState(false);
  const [orderNote, setOrderNote] = useState(product.orderDetails.note);
  const [address, setAddress] = useState(product.orderDetails.deliveryAddress);
  const [numberOfItems, setNumberOfItems] = useState(
    product.orderDetails.numberOfItems,
  );
  const [selectedColor, setSelectedColor] = useState(
    product.orderDetails.color,
  );
  const [errors, setErrors] = useState('');

  const [inFavorit, setInFavorit] = useState(() => {
    const existingIndex = favorit.findIndex(prod => prod.key === productID);
    if (existingIndex >= 0) {
      return true;
    } else {
      return false;
    }
  });

  const colorsArray = product.colors;
  const photosArray = product.photos;

  console.log('product in edit order : ', product);
  console.log('product ID : ', productID);

  // _________ size Dropdown hooks _________
  const [sizeDDopen, setSizeDDOpen] = useState(false);
  const [size, setSize] = useState(product.orderDetails.size);
  const [sizeDDitems, setSizeDDItems] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Prodcut Details',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconSize={23}
            iconName={inFavorit ? 'heart-off' : 'heart-outline'}
            onPress={handleFavoritPressed}
          />
        </HeaderButtons>
      ),
    });
  });

  useEffect(() => {
    getSizesArray();
    checkFavoritPresents();
  }, []);

  // getting the available sizes for the dropdown
  const getSizesArray = () => {
    let sizeArray = [];
    product.sizes.map((size, index) => {
      key = size;
      sizeArray.push({label: size, value: size});
      setSizeDDItems(sizeArray);
    });
  };

  // Save changes
  const handleSavePressed = async () => {
    setUpdatingData(true);
    try {
      await dispatch(
        cartActions.updateCartProduct(
          productID,
          numberOfItems,
          size,
          selectedColor,
          orderNote,
          address,
        ),
      );
      await dispatch(cartActions.getCartProducts());
      await dispatch(cartActions.getCartTotals());
    } catch (error) {
      console.log('Errrrrrorrrrr', error);
    }
    setUpdatingData(false);
  };

  // Add/Remove to favorit
  const handleFavoritPressed = () => {
    try {
      dispatch(favoritActions.toggleProductToFavorit(product));
      setInFavorit(!inFavorit);
    } catch (error) {
      console.log(error);
    }
  };
  // Checking in favorit status
  const checkFavoritPresents = () => {
    const existingIndex = favorit.findIndex(prod => prod.key === productID);
    if (existingIndex >= 0) {
      setInFavorit(true);
    } else {
      setInFavorit(false);
    }
  };

  const SizeDropDown = () => {
    return (
      <View // Size View
        style={{
          paddingLeft: 10,
          marginBottom: 10,
          flexDirection: 'row',
          width: Constants.screenWidth,
          height: Constants.screenHeight * 0.03,
          alignContent: 'center',
        }}>
        <DropDownPicker
          placeholder={product.sizes[0]}
          style={styles.dropDown}
          theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
          open={sizeDDopen}
          value={size}
          items={sizeDDitems}
          setOpen={setSizeDDOpen}
          setValue={setSize}
          setItems={setSizeDDItems}
          onChangeValue={() => {}}
          dropDownDirection="TOP"
          bottomOffset={100}
          listMode="SCROLLVIEW"
          textStyle={{fontSize: RFPercentage(2)}}
        />
      </View>
    );
  };

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

  if (isLoading || product.key !== productID) {
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
              {photosArray.map((image, index) => {
                return (
                  <View style={styles.slide} key={index}>
                    <Image source={{uri: image}} style={styles.image} />
                  </View>
                );
              })}
            </Swiper>
          </View>

          <View // Price View
            style={{
              paddingLeft: 10,
              marginBottom: 10,
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <Text style={styles.textHeader}>Price: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {product.price + ' EGP'}
            </Text>
          </View>

          <View // Number Of Items
            style={{
              paddingLeft: 10,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.textHeader}>Number of Items: </Text>

            <View style={{alignSelf: 'center'}}>
              <NumberEdit
                style={{backgroundColor: Colors.white}}
                number={numberOfItems}
                SubOnPress={() => {
                  if (numberOfItems === 1) return;
                  setNumberOfItems(numberOfItems - 1);
                }}
                AddOnPress={() => {
                  setNumberOfItems(numberOfItems + 1);
                }}
              />
            </View>
          </View>

          <View // Size View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Size: </Text>

            <SizeDropDown />
          </View>

          <View // Colors View
          >
            <View
              style={{
                paddingLeft: 10,
                // marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.textHeader}>Color: </Text>
              <Text numberOfLines={1} style={styles.text}>
                {selectedColor}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {colorsArray.map(element => {
                return (
                  <ColorCard
                    key={element}
                    style={styles.colorCard}
                    color={element}
                    onPress={() => {
                      setSelectedColor(element);
                    }}
                  />
                );
              })}
            </View>
          </View>

          <View // Note View
            style={{
              flex: 1,
              paddingLeft: 10,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text style={styles.textHeader}>Order Note: </Text>
            <TextInput
              numberOfLines={2}
              style={styles.textInput}
              value={orderNote}
              onChangeText={text => {
                setOrderNote(text);
              }}
            />
          </View>

          <View // Shipping address View
            style={{
              flex: 1,
              paddingLeft: 10,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text style={styles.textHeader}>Shipping Address: </Text>
            <TextInput
              numberOfLines={1}
              style={styles.textInput}
              value={address}
              onChangeText={text => {
                setAddress(text);
              }}
            />
          </View>

          <View // Delivery Time View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Delevery Time: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {product.deliveryTime}
            </Text>
          </View>

          <View // Description View
            style={{paddingLeft: 10, marginBottom: 10}}>
            <Text style={styles.textHeader}>Description: </Text>
            <Text numberOfLines={12} style={styles.text}>
              {product.description}
            </Text>
          </View>

          <View // Category View
            style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Category: </Text>
            <Text numberOfLines={1} style={styles.text}>
              {product.category}
            </Text>
          </View>

          <LoginButton // Save Button
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
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
};
