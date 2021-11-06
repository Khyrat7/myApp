import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import DirectScreen from './DirectScreen';
import UserProfile from './UserProfile';
import EditProfile from './settings/EditProfile';
import {ThemeContext} from '../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Settings from './settings/Settings';

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
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, title: 'Intro'}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: true, title: 'Login'}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: true, title: 'Home Page'}}
        />

        <Stack.Screen
          name="DirectScreen"
          component={DirectScreen}
          options={{headerShown: false, title: 'PleaseWait'}}
        />

        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{title: 'User Profile'}}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: true, title: 'Edit Profile'}}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
        {/*

                <Stack.Screen
          name=""
          component={}
          options={{title: ''}}
        />
        

             <Stack.Screen
          name=""
          component={}
          options={{title: ''}}
        />
        

             <Stack.Screen
          name=""
          component={}
          options={{title: ''}}
        />
        



         */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
