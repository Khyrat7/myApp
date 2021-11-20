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

import BottomTabNavigator from './BottomTabNavigator';

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

          headerTintColor: Colors.white,

          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: RFPercentage(3),
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
          options={{headerShown: true, title: ''}}
        />

        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: true, title: ' '}}
        />

        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{headerShown: true, title: ' '}}
        />

        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{title: ' '}}
        />

        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{title: 'My Cart'}}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{title: ' '}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
