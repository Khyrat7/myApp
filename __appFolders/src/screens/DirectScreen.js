import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

const DirectScreen = props => {
  const {navigation, route} = props;

  useEffect(() => {
    setTimeout(() => {
      route.params
        ? navigation.navigate(route.params.toScreen)
        : navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
    }, 2000);
  }, [navigation]);

  return (
    <LottieView
      style={styles.container}
      source={require('../../assets/animation/pleaseWaint.json')}
      loop
      autoPlay
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.black,
  },
});

export default DirectScreen;
