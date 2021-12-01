import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from 'react-native-fbsdk-next/types/FBLoginButton';

//
//_________ Redux imports _________
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/productsActions';

import CustomHeaderButton from '../components/HeaderButton';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import DismissKeyboard from '../components/DismissKeyboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import ProductCard from '../components/ProductCard';

export default function SearchScreen(props) {
  Icon.loadFont();

  const products = useSelector(state => state.products.searchProducts);
  const dispatch = useDispatch();

  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  const [lastSearchText, setLastSearchText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconSize={23}
            iconName="notification-clear-all"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconSize={23}
            iconName="cart-outline"
            onPress={() => navigation.navigate('CartScreen')}
          />
        </HeaderButtons>
      ),
    });
  });

  // _______________ Function __________________

  const handleSearchPressed = async () => {
    if (searchInput.trim() === '') return;
    setIsLoading(true);
    await dispatch(
      productsActions.getSearchProducts(searchInput.toLowerCase()),
    );
    setLastSearchText(searchInput);
    setIsLoading(false);
  };

  // _______________ Styles __________________
  const styles = StyleSheet.create({
    mainSearchContainer: {
      backgroundColor: themeColors.header,
      width: '100%',
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: 'space-between',
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    searchInput: {
      width: '90%',
      backgroundColor: Colors.white,
      borderRadius: 5,
      fontSize: RFPercentage(2.5),
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    searchIcon: {
      color: themeColors.headerFont,
      justifyContent: 'center',
      alignContent: 'center',
    },
    emptyProducts: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.background,
    },
    text: {
      textAlign: 'center',
      color: themeColors.mainFont,
      fontSize: RFPercentage(3),
      marginHorizontal: 20,
    },
    resultText: {
      color: themeColors.headerFont,
      justifyContent: 'center',
      alignContent: 'center',
    },
  });

  return (
    <View style={{backgroundColor: themeColors.background, flex: 1}}>
      <View style={styles.mainSearchContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchInput}
            onChangeText={text => {
              setSearchInput(text);
            }}
          />
          <TouchableOpacity onPress={handleSearchPressed}>
            <Text style={styles.searchIcon}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Icon name="search" size={RFPercentage(3)} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {/* {products.length !== 0 ? ( */}
        <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.searchIcon}>
            <Text style={{fontWeight: 'bold'}}>Last Searched: </Text>
            {lastSearchText}
          </Text>
          <Text style={styles.searchIcon}>
            <Text style={{fontWeight: 'bold'}}> Total Results : </Text>
            {products.length}
          </Text>
        </View>
        {/* ) : null} */}
        {isLoading ? <ActivityIndicator size="small" /> : null}
      </View>
      <DismissKeyboard>
        {products.length === 0 ? (
          <View style={styles.emptyProducts}>
            <Text style={styles.text}>
              No Results for you current Search .Please enter your search above
            </Text>
          </View>
        ) : (
          <FlatList
            // onRefresh={getProductsData}
            // refreshing={isRefresh}
            data={products}
            ItemSeparatorComponent={() => <View></View>}
            renderItem={product => {
              return (
                <ProductCard
                  onPress={() => {
                    // console.log(product.item.key);
                    try {
                      navigation.navigate('ProductScreen', {
                        key: product.item.key,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  product={product}
                />
              );
            }}
          />
        )}
      </DismissKeyboard>
    </View>
  );
}
