// ToDo
// styling the navigation bar

import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import DismissKeyboard from '../../components/DismissKeyboard';
import Constants from '../../../constants/PhoneDimentions';
import ProfileTextField from '../../components/ProfileTextField';
import {formatDateLong, formatDateShort} from '../../../modules/DateModule';
import ProfileTextInput from '../../components/ProfileTextInput';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Images from '../../../constants/Images';

const UserProfile = props => {
  // Props
  const {navigation, route} = props;

  // Hooks
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            // Checking if any changes took place by the user
            if (!edited && !imageChanged) {
              navigation.goBack();
            } else {
              Alert.alert(
                'Save Changes?',
                'Do you want to save the changes you made ??',
                [
                  {
                    text: 'Yes',
                    // saving changes
                    onPress: async () => {
                      setIsLoading(true);
                      try {
                        await handleSaveClicked();
                      } catch (error) {
                        console.log(error);
                      }
                      Alert.alert('Saved', 'Changes Saved Successfully.');
                    },
                  },
                  {
                    // ignore changes and navigate back
                    text: 'No',
                    onPress: () => {
                      isLoading ? null : navigation.goBack();
                    },
                  },
                ],
              );
            }
          }}>
          <Text style={styles.headerText}>⇦</Text>
        </TouchableOpacity>
      ),
      headerRight: () =>
        // only shows if any changes did take place by user
        edited || imageChanged ? (
          <TouchableOpacity
            onPress={() => {
              setIsLoading(true);

              setImage(user.imageURL);
              setName(user.name);
              setUserName(user.username);
              setPhoneNumber(user.phoneNumber);
              setGender(user.gender);

              setEdited(false);
              setImageChanged(false);
              setIsLoading(false);
            }}>
            <Text style={styles.headerText}>Undo</Text>
          </TouchableOpacity>
        ) : null,
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
        setName(user.data().name);
        setUserName(user.data().username);
        setPhoneNumber(user.data().phoneNumber);
        setGender(user.data().gender);
        setIsLoading(false);
      });
  };

  // Upload Photo Functions

  takePhotoFromCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      },
      res => {
        if (res.didCancel) return;
        const imageUri = res.assets[0].uri;
        console.log(res.errorCode);
        setImageChanged(true);
        setImage(imageUri);
      },
    );
  };

  choosePhotoFromLibrary = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
        width: Constants.screenWidth * 0.25,
        height: Constants.screenWidth * 0.25,
      },
      res => {
        if (res.didCancel) return;
        const imageUri = res.assets[0].uri;
        console.log(res.errorCode);
        console.log(res.assets[0]);
        setImageChanged(true);
        setImage(imageUri);
      },
    );
  };

  uploadPhotoToStorage = async () => {
    setIsLoading(true);
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    console.log('fiel name : ', fileName);
    try {
      await storage().ref(fileName).putFile(uploadUri);
      storage()
        .ref(fileName)
        .getDownloadURL()
        .then(url => {
          console.log('stored file url : ', url);
          firestore().collection('users').doc(userID).update({
            imageURL: url,
          });
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  changePhoto = () => {
    Alert.alert('Change Profile Photo', 'Please select one of the folloing', [
      {
        text: 'Take Photo',
        onPress: () => {
          takePhotoFromCamera();
        },
      },
      {
        text: 'Choose From Library',
        onPress: () => {
          choosePhotoFromLibrary();
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  handleSaveClicked = async () => {
    setIsLoading(true);
    try {
      if (imageChanged) {
        // uplading image to storage and updating the user profile
        await uploadPhotoToStorage();
        setImageChanged(false);
        if (!edited) {
          setIsLoading(false);
        }
      }
      if (edited) {
        await firestore().collection('users').doc(userID).update({
          name: name,
          username: userName,
          phoneNumber: phoneNumber,
          gender: gender,
        });
        setIsLoading(false);
        setEdited(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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

            <TouchableOpacity
              style={styles.photoFram}
              onPress={() => {
                changePhoto();
              }}>
              <Image
                style={styles.userPhoto}
                source={image ? {uri: image} : Images.defaultUserPhoto}
              />
            </TouchableOpacity>
            <ProfileTextField title="Email:" value={user.email} />
            <ProfileTextInput
              title="Name:"
              value={name}
              placeholder="Name"
              onChangeText={text => {
                setEdited(true);
                setName(text);
              }}
            />
            <ProfileTextInput
              title="Username:"
              value={userName}
              placeholder="Username"
              onChangeText={text => {
                setEdited(true);
                setUserName(text);
              }}
            />
            <ProfileTextInput
              title="Phone Number:"
              value={phoneNumber}
              placeholder="Phone Number"
              onChangeText={text => {
                setEdited(true);
                setPhoneNumber(text);
              }}
            />
            <ProfileTextInput
              //*******************  Use dropdown picker  */
              title="Gender:"
              value={gender}
              placeholder="Gender"
              onChangeText={text => {
                setEdited(true);
                setGender(text);
              }}
            />
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
