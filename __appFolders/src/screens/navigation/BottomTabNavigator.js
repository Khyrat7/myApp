import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import NotificationsScreen from '../NotificationsScreen';
import SearchScreen from '../SearchScreen';
import DirectScreen from '../DirectScreen';
import Colors from '../../../constants/Colors';
import {ThemeContext} from '../../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import DrawerNavigator from './DrawerNavigator';

const Tab = createBottomTabNavigator();

export default BottomTabNavigator = () => {
  const {themeColors} = useContext(ThemeContext);
  Icon.loadFont();

  return (
    <Tab.Navigator
      // initialRouteName="Home"
      name="myDemoApp"
      // initialRouteName="Home"

      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.header,
        },
        tabBarActiveTintColor: Colors.white,
        tabBarStyle: {
          backgroundColor: themeColors.header,
        },

        headerTintColor: Colors.white,

        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFPercentage(3),
        },
        tabBarOptions: {
          showIcon: true,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',

          tabBarIcon: ({color}) => (
            <Icon name="search1" color={color} size={30} />
          ),
          tabBarBadge: 1,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'notification',

          tabBarIcon: ({color}) => (
            <Icon name="notification" color={color} size={30} />
          ),
          tabBarBadge: 1,
        }}
      />
    </Tab.Navigator>
  );
};
