import React, {useEffect, useContext} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Images from '../../../__appFolders/constants/Images';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import Constants from '../../constants/PhoneDimentions';
import {ThemeContext} from '../../context/LayoutContext';

export default SplashScreen = props => {
  // Props & Hooks
  const {navigation} = props;
  const {themeColors} = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      checkAuth();
    }, 2000);
  }, [navigation]);

  // Functions
  // Checking if the user is still logged in or not and navigate to the corresponding screen
  // LoginScreen if signed out - HomeScreen if singned in  (in any screen of the app)
  checkAuth = () => {
    try {
      auth().onAuthStateChanged(user => {
        if (user != null) {
          if (user.emailVerified === true) {
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }
      });
    } catch (e) {
      console.log(
        'Error getting the user authentication on SplashScreen : ',
        e,
      );
    }
  };
  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.background,
      paddingVertical: Constants.screenHeight * 0.2,
    },

    image: {
      width: Constants.screenWidth * 0.4,
      height: Constants.screenWidth * 0.4,
    },
    animation: {
      flex: 1,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={Images.logo} />
      </View>
      <View style={styles.container}>
        <LottieView
          style={styles.animation}
          source={require('../../assets/animation/hello.json')}
          autoPlay
          loop
        />
      </View>
    </>
  );
};
