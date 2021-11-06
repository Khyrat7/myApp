// ToDo
// Show error if the phone number is not a valid number

import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import DismissKeyboard from '../../components/DismissKeyboard';
import Constants from '../../../constants/PhoneDimentions';
import ProfileTextField from '../../components/ProfileTextField';
import {
  formatDateLong,
  formatDateShort,
  formatNormalDate,
} from '../../../modules/DateModule';
import ProfileTextInput from '../../components/ProfileTextInput';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Images from '../../../constants/Images';
import {ThemeContext} from '../../../context/LayoutContext';
import DropDown from '../../components/DropDown';
import DateTimePicker from '@react-native-community/datetimepicker';
import LoginValidation from '../../../validation/LoginValidation';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default UserProfile = props => {
  // Props & Hooks
  const {navigation, route} = props;
  const {themeColors, theme} = useContext(ThemeContext);

  const [edited, setEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);

  // _________ Date Hooks ______________

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // _________ Gender Dropdown hooks _________
  const [genderDDopen, setGenderDDOpen] = useState(false);
  const [genderDDitems, setGenderDDItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  useEffect(() => {
    getUserData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            // // Checking if any changes took place by the user
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
                        if (!isLoading) {
                          setEdited(false);
                          setImageChanged(false);
                          navigation.goBack();
                          Alert.alert('Saved', 'Changes Saved Successfully.');
                        } else {
                          null;
                        }
                      } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                      }
                    },
                  },
                  {
                    // ignore changes and navigate back
                    text: 'No',
                    onPress: () => {
                      if (!isLoading) {
                        setEdited(false);
                        setImageChanged(false);
                        navigation.goBack();
                      } else {
                        null;
                      }
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
            style={styles.headerButton}
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

  // _________ fetching _________
  const userID = auth().currentUser.uid;
  const joinDate = formatDateShort(user.createdAt);
  const bDate = formatNormalDate(user.birthDate);

  // _________ Firestore functions _________
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
          setName(user.data().name);
          setUserName(user.data().username);
          setPhoneNumber(user.data().phoneNumber);
          setGender(user.data().gender);
          setBirthDate(user.data().birthDate);
          setAddress(user.data().address);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
    setEdited(false); // Because when the value changes in the gender dropdown it sets the editing to true
  };

  // _________ Upload Photo Functions _________

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
    fileName = userID + '/' + fileName;
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
          birthDate: birthDate,
          address: address,
        });
        setIsLoading(false);
        setEdited(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // _________ Date Picker Functions _________

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      showMode('date');
    }
  };

  changeBirthDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setBirthDate(new Date(currentDate).toUTCString());
    setEdited(true);
  };

  // _________ Text Validation _________

  validatePhoneNumber = () => {
    console.log('entered validation');
    isValid = LoginValidation.isValidNumber(phoneNumber);
    if (!isValid) {
      console.log('nooooo number');
    } else {
      console.log('is number');
    }
  };

  // _________ Styles _________
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'stretch',
      backgroundColor: themeColors.background,
      paddingBottom: 150,
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
      marginBottom: Constants.screenHeight * 0.01,
    },
    photoFram: {
      width: Constants.screenWidth * 0.25,
      height: Constants.screenWidth * 0.25,
      alignSelf: 'center',
      marginBottom: Constants.screenHeight * 0.01,
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
        <KeyboardAvoidingView style={styles.container} enabled>
          <SafeAreaView>
            <View style={styles.container}>
              {isLoading ? (
                <ActivityIndicator
                  style={{
                    marginTop: 30,
                    marginBottom: 30,
                  }}
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
              <ProfileTextField
                title="Birth Date:"
                value={formatNormalDate(birthDate)}
              />
              <TouchableOpacity
                style={{
                  height: RFPercentage(3),
                  backgroundColor: themeColors.background,
                  borderRadius: 10,
                  width: Constants.screenWidth * 0.3,
                  alignSelf: 'center',
                  marginVertical: 5,
                }}
                onPress={showDatepicker}>
                <Text
                  style={{
                    color: themeColors.titleFont,
                    textAlign: 'center',
                    fontSize: RFPercentage(2),
                  }}>
                  {' '}
                  Change Date
                </Text>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  onChange={changeBirthDate}
                  color={Colors.Darkgray}
                  backgroundColor={Colors.Darkgray}
                  themeVariant={Platform.OS === 'ios' ? theme : null}
                />
              )}
              <DropDown
                title="Gender"
                open={genderDDopen}
                value={gender}
                items={genderDDitems}
                setItems={setGenderDDItems}
                setOpen={setGenderDDOpen}
                setValue={setGender}
                placeholder={gender}
                onChangeValue={() => {
                  setEdited(true);
                }}
              />

              <ProfileTextInput
                title="Phone Number:"
                value={phoneNumber}
                placeholder="Phone Number"
                onChangeText={text => {
                  setPhoneNumber(text);
                  validatePhoneNumber();
                }}
                onEndEditing={() => {
                  validatePhoneNumber();
                }}
                keyboardType="numeric"
              />

              <ProfileTextInput
                title="Address:"
                value={address}
                placeholder="Address"
                onChangeText={text => {
                  setAddress(text);
                  setEdited(true);
                }}
              />

              <ProfileTextField title="Join Date:" value={joinDate} />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </ScrollView>
  );
};
