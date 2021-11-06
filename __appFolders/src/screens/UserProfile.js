import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
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
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import DismissKeyboard from '../components/DismissKeyboard';
import Constants from '../../constants/PhoneDimentions';
import ProfileTextField from '../components/ProfileTextField';
import {
  formatDateLong,
  formatDateShort,
  formatNormalDate,
} from '../../modules/DateModule';
import Images from '../../constants/Images';
import {ThemeContext} from '../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default UserProfile = props => {
  // Props
  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);

  // Hooks
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text style={styles.headerText}>⇦</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
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
    try {
      await firestore()
        .collection('users')
        .doc(userID)
        .get()
        .then(user => {
          setUser(user.data());
          setImage(user.data().imageURL);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'stretch',
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
    userPhoto: {
      width: Constants.screenWidth * 0.25,
      height: Constants.screenWidth * 0.25,
      borderRadius: Constants.screenWidth * 0.25,
      borderWidth: 2,
      borderColor: themeColors.border,
      alignSelf: 'center',
      marginTop: Constants.screenHeight * 0.01,
    },
    photoFram: {
      width: Constants.screenWidth * 0.25,
      height: Constants.screenWidth * 0.25,
      alignSelf: 'center',
    },
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: themeColors.background,
        alignContent: 'center',
      }}
      contentInsetAdjustmentBehavior="automatic">
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
              <ProfileTextField
                title="Birth Date:"
                value={formatNormalDate(user.birthDate)}
              />
              <ProfileTextField title="Gender:" value={user.gender} />
              <ProfileTextField
                title="Phone Number:"
                value={user.phoneNumber}
              />
              <ProfileTextField title="Address:" value={user.address} />
              <ProfileTextField title="Join Date:" value={joinDate} />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </ScrollView>
  );
};
