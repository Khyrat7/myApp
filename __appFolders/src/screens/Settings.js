import React, {useContext, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';

export default function Settings(props) {
  Icon.loadFont();

  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  const [language, setLanguage] = useState('Eng');
  const [lanSwitch, setLangSwitch] = useState(true);
  const [themeSwitch, setThemeSwitch] = useState(() => {
    if (theme === 'dark') {
      return false;
    }
    if (theme === 'light') {
      return true;
    }
  });
  const userID = auth().currentUser.uid;

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  });

  // ____ Switchs _____
  toggleLangSwitch = () => {
    if (language === 'Eng') {
      setLanguage('Arb');
      setLangSwitch(!lanSwitch);
    } else {
      setLanguage('Eng');
      setLangSwitch(!lanSwitch);
    }
  };

  toggleThemeSwitch = () => {
    try {
      if (theme === 'dark') {
        setTheme('light');
        setThemeSwitch(true);
      } else {
        setTheme('dark');
        setThemeSwitch(false);
      }

      firestore()
        .collection('userObjects')
        .doc(userID)
        .update({
          appTheme: theme === 'dark' ? 'light' : 'dark',
        });
    } catch (error) {
      console.log(error);
    }
  };

  const Styles = StyleSheet.create({
    textContainer: {
      height: Constants.screenHeight * 0.1,
      width: '80%',
      fontSize: RFPercentage(3),
      color: themeColors.mainFont,
      paddingTop: Constants.screenHeight * 0.03,
      alignSelf: 'flex-start',
    },
    button: {
      flexDirection: 'row',
      alignContent: 'space-between',
      paddingHorizontal: Constants.screenWidth * 0.05,
    },
    arrow: {
      textAlign: 'right',
      color: themeColors.mainFont,
      width: '20%',
      height: Constants.screenHeight * 0.1,
      paddingTop: Constants.screenHeight * 0.03,
      textAlign: 'right',
      paddingRight: Constants.screenWidth * 0.02,
      fontSize: RFPercentage(3),
    },
    switch: {
      alignItems: 'flex-end',
      textAlign: 'right',
      alignContent: 'flex-end',
      width: '20%',
      paddingRight: Constants.screenWidth * 0.02,
      fontSize: RFPercentage(3),
      alignSelf: 'center',
    },
    separator: {
      alignSelf: 'center',
      width: '100%',
      borderColor: themeColors.border,
      borderWidth: 0.4,
      height: 1,
    },
  });

  return (
    <View style={{backgroundColor: themeColors.background, flex: 1}}>
      <TouchableOpacity // Edit Profile
        style={Styles.button}
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <Text style={Styles.textContainer}>Edit Profile</Text>
        <Text style={Styles.arrow}>
          <Icon name="chevron-forward-outline" size={RFPercentage(3)} />
        </Text>
      </TouchableOpacity>
      <View style={Styles.separator}></View>

      <View // Language Switch
        style={Styles.button}>
        <Text style={Styles.textContainer}>Language: {language}</Text>
        <View style={Styles.switch}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={lanSwitch ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLangSwitch}
            value={lanSwitch}
          />
        </View>
      </View>
      <View style={Styles.separator}></View>

      <View // Theme Switch
        style={Styles.button}>
        <Text style={Styles.textContainer}>Theme: {theme}</Text>
        <View style={Styles.switch}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={themeSwitch ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleThemeSwitch}
            value={themeSwitch}
          />
        </View>
      </View>
      <View style={Styles.separator}></View>

      <TouchableOpacity // Terms & Conditions
        style={Styles.button}
        onPress={() => {
          navigation.navigate('Terms');
        }}>
        <Text style={Styles.textContainer}>Terms {'&'} Conditions</Text>
        <Text style={Styles.arrow}>
          <Icon name="chevron-forward-outline" size={RFPercentage(3)} />
        </Text>
      </TouchableOpacity>
      <View style={Styles.separator}></View>

      <TouchableOpacity // Privacy policy
        style={Styles.button}
        onPress={() => {
          navigation.navigate('PrivacyPolicy');
        }}>
        <Text style={Styles.textContainer}>Privacy Policy</Text>
        <Text style={Styles.arrow}>
          <Icon name="chevron-forward-outline" size={RFPercentage(3)} />
        </Text>
      </TouchableOpacity>
      <View style={Styles.separator}></View>

      <TouchableOpacity // Rate App.
        style={Styles.button}>
        <Text style={Styles.textContainer}>Rate App.</Text>
        <Text style={Styles.arrow}>
          <Icon name="chevron-forward-outline" size={RFPercentage(3)} />
        </Text>
      </TouchableOpacity>
      <View style={Styles.separator}></View>

      <TouchableOpacity // Logout
        style={Styles.button}
        onPress={() => {
          auth().signOut();
        }}>
        <Text style={Styles.textContainer}>Logout</Text>
        <Text style={Styles.arrow}>
          <Icon name="chevron-forward-outline" size={RFPercentage(3)} />
        </Text>
      </TouchableOpacity>
      <View style={Styles.separator}></View>
    </View>
  );
}
