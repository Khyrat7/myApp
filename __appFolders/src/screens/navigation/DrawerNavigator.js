import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsScreen from '../Settings';
import HomeScreen from '../HomeScreen';
import CartScreen from '../CartScreen';
import UserProfile from '../UserProfile';
import PrivacyPolicy from '../PrivacyPolicy';
import Terms from '../Terms';
import BottomTabNavigator from './BottomTabNavigator';
import Colors from '../../../constants/Colors';
import {ThemeContext} from '../../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  const {themeColors} = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      name="myDemoApp"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          //   backgroundColor: themeColors.header,
        },
        headerStyle: {
          backgroundColor: themeColors.header,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFPercentage(2),
        },
        headerTintColor: Colors.white,
      }}>
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="My Profile" component={UserProfile} />
      <Drawer.Screen name="My Cart" component={CartScreen} />
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Drawer.Screen name="Terms and Conditions" component={Terms} />
    </Drawer.Navigator>
  );
};
