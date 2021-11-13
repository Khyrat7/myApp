import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';

export default function Settings(props) {
  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  const [language, setLanguage] = useState('Eng');
  const [lanSwitch, setLangSwitch] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [themeSwitch, setThemeSwitch] = useState(true);

  useEffect(() => {}, []);

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
      //   borderColor: themeColors.border,
      //   borderWidth: 0.5,
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
      <TouchableOpacity
        style={Styles.button}
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <Text style={Styles.textContainer}>Edit Profile</Text>
        <Text style={Styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <View style={Styles.separator}></View>

      <View style={Styles.button}>
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

      <View style={Styles.button}>
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

      <TouchableOpacity
        style={Styles.button}
        onPress={() => {
          navigation.navigate('Terms');
        }}>
        <Text style={Styles.textContainer}>Terms {'&'} Conditions</Text>
        <Text style={Styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <View style={Styles.separator}></View>

      <TouchableOpacity
        style={Styles.button}
        onPress={() => {
          navigation.navigate('PrivacyPolicy');
        }}>
        <Text style={Styles.textContainer}>Privacy Policy</Text>
        <Text style={Styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <View style={Styles.separator}></View>

      <TouchableOpacity style={Styles.button}>
        <Text style={Styles.textContainer}>Rate App.</Text>
        <Text style={Styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <View style={Styles.separator}></View>
    </View>
  );
}
