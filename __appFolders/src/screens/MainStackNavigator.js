import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../../constants/Colors';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import DirectScreen from './DirectScreen';
import UserProfile from './UserProfile';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // Stack Screens common options and styling
        name="myDemoApp"
        initialRouteName="SplashScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.orange,
          },
          headerTintColor: '#fff',

          headerTitleStyle: {
            fontWeight: 'bold',
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
