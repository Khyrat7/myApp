import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

//
//_________ Redux imports _________
import {useSelector} from 'react-redux';

import HomeScreen from '../HomeScreen';
import NotificationsScreen from '../NotificationsScreen';
import FavoritScreen from '../FavoritScreen';
import SearchScreen from '../SearchScreen';
import Colors from '../../../constants/Colors';
import {ThemeContext} from '../../../context/LayoutContext';

const Tab = createBottomTabNavigator();

export default BottomTabNavigator = () => {
  const favorit = useSelector(state => state.favorit);
  const totalFavorits = favorit.length;
  const {themeColors} = useContext(ThemeContext);
  Icon.loadFont();
  Icon2.loadFont();

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
          fontSize: RFPercentage(2),
        },
        tabBarOptions: {
          showIcon: true,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon2 name="home" color={color} size={RFPercentage(3)} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Search',

          tabBarIcon: ({color}) => (
            <Icon2 name="search1" color={color} size={RFPercentage(3)} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Notification',

          tabBarIcon: ({color}) => (
            <Icon2 name="notification" color={color} size={RFPercentage(3)} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorits"
        component={FavoritScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Favorits',

          tabBarIcon: ({color}) => (
            <Icon name="heart-outline" color={color} size={RFPercentage(3)} />
          ),

          tabBarBadge: totalFavorits,
        }}
      />
    </Tab.Navigator>
  );
};
