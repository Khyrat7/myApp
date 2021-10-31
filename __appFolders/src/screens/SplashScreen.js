import React, {useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Images from '../../../__appFolders/constants/Images';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';
import Constants from '../../constants/PhoneDimentions';

const SplashScreen = props => {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      checkAuth();
      // navigation.navigate('LoginScreen');
    }, 2000);
  }, [navigation]);

  // Checking if the user is still logged in or not and navigate to the corresponding screen
  // LoginScreen if signed out - HomeScreen if singned in
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingVertical: Constants.screenHeight * 0.2,
  },

  image: {
    width: Constants.screenWidth * 0.4,
    height: Constants.screenWidth * 0.4,
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  animation: {
    flex: 1,
    // width: '100%',
    // height: Constants.screenHeight * 0.5,
    // alignContent: 'center',
  },
});

export default SplashScreen;
