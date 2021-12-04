import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

//
//_________ Redux imports _________
import {useSelector} from 'react-redux';

import AdminMessages from '../adminScreens/AdminMessages';
import AdminNotifications from '../adminScreens/AdminNotifications';
import AdminOrders from '../adminScreens/AdminOrders';
import AdminProducts from '../adminScreens/AdminProducts';
import Colors from '../../../constants/Colors';
import {ThemeContext} from '../../../context/LayoutContext';

const Tab = createBottomTabNavigator();

export default AdminBottonNavigator = () => {
  const {themeColors} = useContext(ThemeContext);
  const activeOrders = useSelector(state => state.admin.activeOrders);

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
        name="Products"
        component={AdminProducts}
        options={{
          headerShown: true,
          tabBarLabel: 'Products',
          tabBarIcon: ({color}) => (
            <Icon name="tshirt-crew" color={color} size={RFPercentage(3)} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={AdminOrders}
        options={{
          headerShown: true,
          tabBarLabel: 'Orders',

          tabBarIcon: ({color}) => (
            <Icon
              name="truck-delivery-outline"
              color={color}
              size={RFPercentage(3)}
            />
          ),
          tabBarBadge: activeOrders.length,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={AdminNotifications}
        options={{
          headerShown: true,
          tabBarLabel: 'Notification',

          tabBarIcon: ({color}) => (
            <Icon2 name="notification" color={color} size={RFPercentage(3)} />
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={AdminMessages}
        options={{
          headerShown: true,
          tabBarLabel: 'Messages',

          tabBarIcon: ({color}) => (
            <Icon
              name="message-text-outline"
              color={color}
              size={RFPercentage(3)}
            />
          ),

          // tabBarBadge: totalFavorits,
        }}
      />
    </Tab.Navigator>
  );
};
