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
  Switch,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import DismissKeyboard from '../components/DismissKeyboard';
import Constants from '../../constants/PhoneDimentions';
import ProfileTextField from '../components/ProfileTextField';
import {formatDateLong, formatDateShort} from '../../modules/DateModule';
import ProfileTextInput from '../components/ProfileTextInput';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UserProfile = props => {
  // Props
  const {navigation, route} = props;

  // Hooks
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserData();
    setIsLoading(false);
  }, []);

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
        <TouchableOpacity>
          <Text style={styles.headerText}>⚙️</Text>
        </TouchableOpacity>
      ),
    });
  });

  // fetching
  const userID = auth().currentUser.uid;
  const joinDate = formatDateShort(user.createdAt);

  // Firestore functions
  getUserData = () => {
    setIsLoading(true);
    firestore()
      .collection('users')
      .doc(userID)
      .get()
      .then(user => {
        setUser(user.data());
        setImage(user.data().imageURL);
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
        setImage(imageUri);
        console.log(res.errorCode);
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
        Alert.alert('Confirmation', 'Confirm changing Profile Photo.', [
          {
            text: 'Yes',
            onPress: async () => {
              setImage(imageUri);
              // must get this function in a total save button for the whole changes
              uploadPhotoToStorage();
            },
          },
          {
            text: 'No',
            onPress: () => {},
          },
        ]);
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
      await storage()
        .ref(fileName)
        .getDownloadURL()
        .then(url => {
          console.log('stored file url : ', url);
          firestore().collection('users').doc(userID).update({
            imageURL: url,
          });
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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

  // Views Types
  defaultView = () => {
    return (
      <>
        <Image
          style={styles.userPhoto}
          source={
            image ? {uri: image} : require('../../assets/images/userPhoto.png')
          }
        />
        <ProfileTextField title="Email:" value={user.email} />
        <ProfileTextField title="Name:" value={user.name} />
        <ProfileTextField title="Username:" value={user.username} />
        <ProfileTextField title="Phone Number:" value={user.phoneNumber} />
        <ProfileTextField title="Gender:" value={user.gender} />
        <ProfileTextField title="Join Date:" value={joinDate} />
      </>
    );
  };

  editView = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.photoFram}
          onPress={() => {
            changePhoto();
          }}>
          <Image
            style={styles.userPhoto}
            source={
              image
                ? {uri: image}
                : require('../../assets/images/userPhoto.png')
            }
          />
        </TouchableOpacity>
        <ProfileTextField title="Email:" value={user.email} />
        <ProfileTextInput title="Name:" value={user.name} />
        <ProfileTextInput title="Username:" value={user.username} />
        <ProfileTextInput title="Phone Number:" value={user.phoneNumber} />
        <ProfileTextInput title="Gender:" value={user.gender} />
        <ProfileTextField title="Join Date:" value={joinDate} />
      </>
    );
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
            {edit ? editView() : defaultView()}
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
