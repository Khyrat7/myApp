import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import SettingsScreen from '../Settings';
import AdminBottomNavigator from './AdminBottomNavigator';
import UserProfile from '../UserProfile';
import OrdersScreen from '../OrdersScreen';
import PrivacyPolicy from '../PrivacyPolicy';
import Terms from '../Terms';
import BottomTabNavigator from './BottomTabNavigator';
import Colors from '../../../constants/Colors';
import {ThemeContext} from '../../../context/LayoutContext';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  const {themeColors, theme} = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      name="myDemoApp"
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        drawerInactiveTintColor: Colors.white,
        drawerActiveTintColor: theme === 'light' ? Colors.blue : Colors.white,
        drawerActiveBackgroundColor:
          theme === 'light' ? Colors.white : Colors.black,
        drawerStyle: {
          backgroundColor: themeColors.header,
          width: 240,
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
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        headerShown={true}
      />
      <Drawer.Screen
        name="My Profile"
        component={UserProfile}
        headerShown={true}
      />
      <Drawer.Screen
        name="My Orders"
        component={OrdersScreen}
        headerShown={true}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        headerShown={true}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={Terms}
        headerShown={true}
      />

      <Drawer.Screen
        name="Admin Dashboard"
        component={AdminBottomNavigator}
        headerShown={true}
      />
    </Drawer.Navigator>
  );
};
