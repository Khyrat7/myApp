import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../../constants/Colors';
import SplashScreen from '../SplashScreen';
import LoginScreen from '../LoginScreen';
import HomeScreen from '../HomeScreen';
import DirectScreen from '../DirectScreen';
import UserProfile from '../UserProfile';
import EditProfile from '../EditProfile';
import {ThemeContext} from '../../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Settings from '../Settings';
import Terms from '../Terms';
import PrivacyPolicy from '../PrivacyPolicy';
import ProductScreen from '../ProductScreen';
import NotificationsScreen from '../NotificationsScreen';
import CartScreen from '../CartScreen';
import SearchScreen from '../SearchScreen';
import DrawerNavigator from './DrawerNavigator';
import EditOrderScreen from '../EditOrderScreen';
import OrderDetails from '../OrderDetails';
import AdminAddProduct from '../adminScreens/AdminAddProduct';
import AdminMessages from '../adminScreens/AdminMessages';
import AdminNotifications from '../adminScreens/AdminNotifications';
import AdminOrders from '../adminScreens/AdminOrders';
import AdminProducts from '../adminScreens/AdminProducts';
import AdminProductScreen from '../adminScreens/AdminProductScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const {themeColors} = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        // Stack Screens common options and styling
        name="myDemoApp"
        initialRouteName="SplashScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: themeColors.header,
          },
          // animationEnabled: false,

          headerTintColor: Colors.white,

          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: RFPercentage(2),
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={DrawerNavigator}
          options={{headerShown: false, title: ' '}}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, title: ' '}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: true, title: 'Login'}}
        />

        <Stack.Screen
          name="DirectScreen"
          component={DirectScreen}
          options={{headerShown: false, title: ' '}}
        />

        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: true, title: ' '}}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: true, title: ' '}}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{headerShown: false, title: 'Terms & Conditions'}}
        />

        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false, title: 'Privacy Policy'}}
        />

        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{title: ' '}}
        />

        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{title: ' '}}
        />

        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{title: ' '}}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{title: ' '}}
        />

        <Stack.Screen
          name="EditOrderScreen"
          component={EditOrderScreen}
          options={{title: 'Edit Product Order'}}
        />

        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{title: 'Order Details'}}
        />

        <Stack.Screen
          name="AdminAddProduct"
          component={AdminAddProduct}
          options={{title: 'Add Product'}}
        />

        <Stack.Screen
          name="AdminMessages"
          component={AdminMessages}
          options={{title: 'Messages'}}
        />

        <Stack.Screen
          name="AdminNotifications"
          component={AdminNotifications}
          options={{title: 'Notifications'}}
        />

        <Stack.Screen
          name="AdminOrders"
          component={AdminOrders}
          options={{title: 'Orders'}}
        />

        <Stack.Screen
          name="AdminProducts"
          component={AdminProducts}
          options={{title: 'Products'}}
        />

        <Stack.Screen
          name="AdminProductScreen"
          component={AdminProductScreen}
          options={{title: 'Product Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
