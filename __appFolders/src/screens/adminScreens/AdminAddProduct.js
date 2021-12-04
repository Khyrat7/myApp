import React, {
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//
//_________ Redux imports _________
import {useSelector, useDispatch} from 'react-redux';
import * as adminActions from '../../../store/actions/adminActions';

import CustomHeaderButton from '../../components/HeaderButton';
import Constants from '../../../constants/PhoneDimentions';
import {ThemeContext} from '../../../context/LayoutContext';
import DismissKeyboard from '../../components/DismissKeyboard';
import ColorCard from '../../components/ColorCard';
import Card from '../../components/Card';

export default function AdminAddProduct(props) {
  Icon.loadFont();
  const dispatch = useDispatch();

  const userID = auth().currentUser.uid;

  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  const [imagesArray, setImagesArray] = useState([]);
  const [imageView, setImageView] = useState(true);
  const [sizeView, setSizeView] = useState(false);
  const [colorView, setColorView] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [delivery, setDelivery] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [sizes, setSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const defaultColors = ['orange', 'black', 'blue', 'white', 'green', 'brown'];
  const [updating, setUpdating] = useState(false);
  const storageImagesArray = [];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="save"
              iconSize={23}
              iconName="content-save"
              onPress={async () => {
                if (
                  !imagesArray ||
                  !productName ||
                  !description ||
                  !price ||
                  !category
                ) {
                  Alert.alert(
                    'Required Fieled Missing',
                    'Please Enter all Reqired (*)',
                  );
                } else {
                  Alert.alert('Confirm Saving', 'Add Product ?!', [
                    {
                      text: 'YES',
                      onPress: () => {
                        handleSavePressed();
                      },
                    },
                    {
                      text: 'NO',
                    },
                  ]);
                }
              }}
            />
          </HeaderButtons>

          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Add"
              iconSize={23}
              iconName="camera"
              onPress={handleAddImagePressed}
            />
          </HeaderButtons>
        </View>
      ),
    });
  });

  useEffect(() => {
    const confirmSaving = navigation.addListener('beforeRemove', e => {
      //  Prevent default action
      console.log(e);
      e.preventDefault();
      Alert.alert('Save Changes?', 'Do you want to save Changes', [
        {text: 'YES', onPress: () => handleSavePressed()},
        {
          text: 'NO',

          onPress: () => {
            // e.preventDefault();
            console.log(navigation);
            navigation.removeListener('beforeRemove');
            navigation.goBack();
          },
        },
      ]);
    });
    confirmSaving;
  }, []);

  // _____________ Functions ____________

  const handleSavePressed = async () => {
    setUpdating(true);
    try {
      for (let index = 0; index < imagesArray.length; index++) {
        const image = imagesArray[index];
        let uploadUri = image;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        fileName = 'sellers/' + userID + '/productsImages/' + fileName;
        await storage().ref(fileName).putFile(uploadUri);
        await storage()
          .ref(fileName)
          .getDownloadURL()
          .then(url => {
            storageImagesArray.push(url);
          });
      }

      const product = {
        addedDate: new Date().toUTCString(),
        sellerID: userID,
        category: category,
        colors: selectedColors,
        deliveryTime: delivery,
        description: description,
        photos: storageImagesArray,
        price: price,
        productName: productName,
        sizes: sizes,
        storageQuantitiy: selectedStorage,
        totalReviews: 0,
        reviews: [],
        rating: 0,
      };

      await dispatch(adminActions.addNewProduct(product, userID));
    } catch (e) {
      console.log(e);
    }
    setUpdating(false);
  };

  const handleAddImagePressed = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
        width: Constants.screenWidth * 0.25,
        height: Constants.screenWidth * 0.25,
      },
      res => {
        if (res.didCancel) return;
        const imageUri = res.assets[0].uri;
        setImagesArray(prev => [...prev, imageUri]);
      },
    );
  };

  const handlePhotoPressed = index => {
    Alert.alert('Confirm Delete', 'Delete Photo ?!', [
      {
        text: 'YES',
        onPress: () => {
          const newImagesArray = imagesArray.filter(image => image != index);
          setImagesArray(newImagesArray);
        },
      },
      {
        text: 'NO',
      },
    ]);
  };

  const addSize = () => {
    if (!sizeInput) return;
    if (!sizeInput.trim()) return;

    const testSizeExist = sizes.filter(item => item == sizeInput);
    if (testSizeExist[0] === sizeInput) return;

    setSizes(prev => [...prev, sizeInput]);
    setSizeInput('');
  };

  const removeColor = color => {
    const newColorsArray = selectedColors.filter(item => item != color);
    setSelectedColors(newColorsArray);
  };

  const removeSize = size => {
    const newSizesArray = sizes.filter(item => item != size);
    setSizes(newSizesArray);
  };

  // _____________ Styles ____________

  const styles = StyleSheet.create({
    scrollVeiw: {
      flex: 1,
      backgroundColor: themeColors.background,
      alignContent: 'center',
    },
    container: {
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'stretch',
      backgroundColor: themeColors.background,
      paddingBottom: 150,
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    image: {
      height: 300,
      width: '100%',
      marginVertical: 10,
      borderRadius: 15,
      overflow: 'hidden',
    },
    imageViewToggle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      marginVertical: 10,
    },
    titleText: {
      fontSize: RFPercentage(2),
      fontWeight: 'bold',
      marginVertical: 10,
      color: themeColors.mainFont,
    },
    textInput: {
      backgroundColor: themeColors.fieldColor,
      paddingVertical: 5,
      fontSize: RFPercentage(2),
      marginLeft: 10,
      borderRadius: 5,
      paddingHorizontal: 10,
      color: themeColors.mainFont,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    subCard: {
      width: '70%',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    subView: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      width: '100%',
      marginTop: 5,
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 5,
    },
    subText: {
      color: themeColors.mainFont,
    },
    colorCard: {
      height: 20,
      width: 20,
      borderRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
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
    <ScrollView
      style={styles.scrollVeiw}
      contentInsetAdjustmentBehavior="automatic">
      <DismissKeyboard>
        <KeyboardAvoidingView style={styles.container} enabled>
          <SafeAreaView>
            {updating ? (
              <View style={{height: 100}}>
                <ActivityIndicator size="large" />
              </View>
            ) : null}
            <View style={styles.container}>
              <View // Image View
                style={styles.inputContainer}>
                <View style={styles.imageViewToggle}>
                  <Text style={styles.titleText}>
                    {' '}
                    * Product Images ( {imagesArray.length} )
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setImageView(!imageView);
                    }}>
                    <Text>
                      <Icon
                        name={imageView ? 'menu-up' : 'menu-down'}
                        size={RFPercentage(4)}
                        color={themeColors.mainFont}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {!imageView
                    ? null
                    : imagesArray === []
                    ? null
                    : imagesArray.map((image, index) => {
                        key = index;
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              handlePhotoPressed(image);
                            }}>
                            <Image style={styles.image} source={{uri: image}} />
                          </TouchableOpacity>
                        );
                      })}
                </View>
              </View>

              <View // Product Name
                style={styles.inputContainer}>
                <Text style={styles.titleText}>* Product Name: </Text>
                <TextInput
                  style={styles.textInput}
                  value={productName}
                  onChangeText={text => {
                    setProductName(text);
                  }}
                />
              </View>

              <View // Product Description
                style={styles.inputContainer}>
                <Text style={styles.titleText}>* Description: </Text>
                <TextInput
                  style={styles.textInput}
                  value={description}
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={text => {
                    setDescription(text);
                  }}
                />
              </View>

              <View // Product Category
                style={styles.inputContainer}>
                <Text style={styles.titleText}>* Category: </Text>
                <TextInput
                  style={styles.textInput}
                  value={category}
                  onChangeText={text => {
                    setCategory(text);
                  }}
                />
              </View>

              <View // Product Price
                style={{...styles.inputContainer}}>
                <Text style={styles.titleText}>* Price: </Text>
                <TextInput
                  style={{...styles.textInput, width: '30%'}}
                  value={price}
                  onChangeText={text => {
                    setPrice(text);
                  }}
                  keyboardType="decimal-pad"
                />
              </View>

              <View // Product storage
                style={{...styles.inputContainer}}>
                <Text style={styles.titleText}> Storage Quantity: </Text>
                <TextInput
                  style={{...styles.textInput, width: '30%'}}
                  value={selectedStorage}
                  onChangeText={text => {
                    setSelectedStorage(text);
                  }}
                  keyboardType="number-pad"
                />
              </View>

              <View // Product Delivery time
                style={styles.inputContainer}>
                <Text style={styles.titleText}> Delivery Time: </Text>
                <TextInput
                  style={styles.textInput}
                  value={delivery}
                  onChangeText={text => {
                    setDelivery(text);
                  }}
                />
              </View>

              <View // Product Sizes
                style={styles.inputContainer}>
                <View // title
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.titleText}>
                    {' '}
                    Sizes ( {sizes.length} ):{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSizeView(!sizeView);
                    }}>
                    <Text>
                      <Icon
                        name={sizeView ? 'menu-up' : 'menu-down'}
                        size={RFPercentage(4)}
                        color={themeColors.mainFont}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View // input
                  style={{flexDirection: 'row'}}>
                  <TextInput
                    style={{...styles.textInput, width: '80%'}}
                    value={sizeInput}
                    onChangeText={text => {
                      setSizeInput(text);
                    }}
                  />
                  <TouchableOpacity onPress={addSize}>
                    <Text>
                      <Icon
                        name="plus"
                        size={RFPercentage(4)}
                        color={themeColors.mainFont}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                {!sizeView ? null : !sizes ? null : (
                  <Card style={styles.subCard}>
                    {sizes.map((size, index) => {
                      key = index;
                      return (
                        <View>
                          <View style={styles.separator}></View>
                          <View // added sizes
                            style={styles.subView}>
                            <Text style={styles.subText}>
                              {' '}
                              {size}
                              {'    '}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                removeSize(size);
                              }}>
                              <Icon
                                name="delete"
                                size={RFPercentage(3)}
                                color={themeColors.mainFont}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.separator}></View>
                        </View>
                      );
                    })}
                  </Card>
                )}
              </View>

              <View // Product Colors
                style={styles.inputContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.titleText}>
                    {' '}
                    Colors ( {selectedColors.length} ):{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setColorView(!colorView);
                    }}>
                    <Text>
                      <Icon
                        name={colorView ? 'menu-up' : 'menu-down'}
                        size={RFPercentage(4)}
                        color={themeColors.mainFont}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                  {defaultColors.map(element => {
                    return (
                      <ColorCard
                        style={styles.colorCard}
                        color={element}
                        key={element}
                        onPress={() => {
                          const testColorExist = selectedColors.filter(
                            item => item == element,
                          );
                          if (testColorExist[0] === element) return;

                          setSelectedColors(prev => [...prev, element]);
                        }}
                      />
                    );
                  })}
                </View>
                {!colorView ? null : !selectedColors ? null : (
                  <Card style={styles.subCard}>
                    {selectedColors.map(element => {
                      return (
                        <View>
                          <View style={styles.separator}></View>

                          <View // added colors
                            style={styles.subView}>
                            <Text style={styles.subText}>
                              {' '}
                              {element}
                              {'    '}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                removeColor(element);
                              }}>
                              <Icon
                                name="delete"
                                size={RFPercentage(3)}
                                color={themeColors.mainFont}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.separator}></View>
                        </View>
                      );
                    })}
                  </Card>
                )}
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </ScrollView>
  );
}
