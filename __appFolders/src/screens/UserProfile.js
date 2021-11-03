import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import DismissKeyboard from '../components/DismissKeyboard';
import Constants from '../../constants/PhoneDimentions';
import ProfileTextField from '../components/ProfileTextField';
import {formatDateLong, formatDateShort} from '../../modules/DateModule';
import Images from '../../constants/Images';

const UserProfile = props => {
  // Props
  const {navigation, route} = props;

  // Hooks
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'User Profile',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text style={styles.headerText}>⇦</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            /// navigating to edit profile temroary for testing
            navigation.navigate('EditProfile');
          }}>
          <Text style={styles.headerText}>⚙️</Text>
        </TouchableOpacity>
      ),
    });
  });

  // fetching
  const userID = auth().currentUser.uid;
  const joinDate = formatDateShort(user.createdAt);

  // Firestore functions
  getUserData = async () => {
    setIsLoading(true);
    await firestore()
      .collection('users')
      .doc(userID)
      .get()
      .then(user => {
        setUser(user.data());
        setImage(user.data().imageURL);
        setIsLoading(false);
      });
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <SafeAreaView>
          <View style={styles.container}>
            {isLoading ? (
              <ActivityIndicator
                style={{marginTop: 10, marginBottom: 10}}
                size="large"
              />
            ) : null}
            <Image
              style={styles.userPhoto}
              source={image ? {uri: image} : Images.defaultUserPhoto}
            />
            <ProfileTextField title="Email:" value={user.email} />
            <ProfileTextField title="Name:" value={user.name} />
            <ProfileTextField title="Username:" value={user.username} />
            <ProfileTextField title="Phone Number:" value={user.phoneNumber} />
            <ProfileTextField title="Gender:" value={user.gender} />
            <ProfileTextField title="Join Date:" value={joinDate} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'stretch',
  },
  headerText: {
    width: 50,
    height: 50,
    fontSize: 30,
    color: Colors.white,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'baseline',
    marginLeft: '3%',
    marginRight: '3%',
  },
  userPhoto: {
    width: Constants.screenWidth * 0.25,
    height: Constants.screenWidth * 0.25,
    borderRadius: Constants.screenWidth * 0.25,
    borderWidth: 2,
    borderColor: Colors.blue,
    alignSelf: 'center',
    marginTop: Constants.screenHeight * 0.01,
  },
  photoFram: {
    width: Constants.screenWidth * 0.25,
    height: Constants.screenWidth * 0.25,
    alignSelf: 'center',
  },
});

export default UserProfile;
