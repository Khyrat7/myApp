import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default DirectScreen = props => {
  const {navigation, route} = props;
  const {themeColors, setTheme} = useContext(ThemeContext);

  const userID = auth().currentUser.uid;
  getUserTheme = async () => {
    try {
      await firestore()
        .collection('userObjects')
        .doc(userID)
        .get()
        .then(user => {
          setTheme(user.data().appTheme);
        });
    } catch (error) {
      console.log(error);
    }
  };
  getUserTheme();

  useEffect(() => {
    const userTheme = setTimeout(() => {
      route.params
        ? navigation.navigate(route.params.toScreen)
        : navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
    }, 2000);
  }, [navigation]);

  // styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: themeColors.background,
    },
  });

  return (
    <LottieView
      style={styles.container}
      source={require('../../assets/animation/pleaseWaint.json')}
      loop
      autoPlay
    />
  );
};

DirectScreen;
