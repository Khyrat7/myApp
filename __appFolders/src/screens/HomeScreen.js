import React, {useLayoutEffect, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';
import firestore from '@react-native-firebase/firestore';

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
          }}>
          <Text style={styles.headerText}>Sign Out</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('UserProfile');
          }}>
          <Text style={styles.headerText}>Profile</Text>
        </TouchableOpacity>
      ),
    });
  });

  onClick = () => {
    try {
      console.log(theme);
      theme === 'dark' ? setTheme('light') : setTheme('dark');

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
      fontSize: 16,
      color: themeColors.headerFont,
      textAlign: 'center',
    },
    headerButton: {
      alignContent: 'center',
      marginHorizontal: 15,
      marginTop: 30,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          await onClick();
        }}>
        <Text style={{color: Colors.white, fontSize: 100}}>hi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
