import React, {useLayoutEffect, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';

const HomeScreen = props => {
  const {navigation, route} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home Page',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            auth().signOut();
          }}>
          <Text>Sign OUT</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            debugger;
            navigation.navigate('UserProfile');
          }}>
          <Text>profile</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          auth().signOut();
        }}>
        <Text style={{color: Colors.white, fontSize: 100}}>hi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.black,
  },
  headerText: {
    width: 50,
    height: 50,
    fontSize: 16,
    alignSelf: 'center',
    color: Colors.white,
  },
});

export default HomeScreen;
