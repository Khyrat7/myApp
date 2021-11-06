import React, {useLayoutEffect, useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';
import firestore from '@react-native-firebase/firestore';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const HomeScreen = props => {
  // Props and Hooks
  const {navigation, route} = props;
  const {theme, themeColors, setTheme} = useContext(ThemeContext);

  userID = auth().currentUser.uid;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home Page',
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            auth().signOut();
            // navigation.navigate('DrawerOpen');
          }}>
          <Text style={styles.headerText}>Sign Out</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <Text style={styles.headerText}>Profile</Text>
        </TouchableOpacity>
      ),
    });
  });

  onClick = () => {
    navigation.navigate('UserProfile');
  };

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: themeColors.background,
    },
    headerText: {
      width: '100%',
      height: 50,
      fontSize: RFPercentage(2),
      color: themeColors.headerFont,
      textAlign: 'center',
    },
    headerButton: {
      alignContent: 'center',
      marginHorizontal: 15,
      marginTop: 30,
      fontSize: RFPercentage(2),
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          await onClick();
        }}>
        <Text
          style={{
            color: themeColors.titleFont,
            fontSize: 40,
            textAlign: 'center',
          }}>
          User Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
