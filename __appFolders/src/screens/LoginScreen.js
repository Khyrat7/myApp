// Issues to fix :
// - Google Auth.
// - Phone Auth.
// - Facebook Auth.
// - Apple Auth.

import React, {useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import LoginTextInput from '../components/LoginTextInput';
import LoginButton from '../components/LoginButton';
import ImageIcon from '../components/ImageIcon';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Constants from '../../constants/PhoneDimentions';
import LoginValidation from '../../validation/LoginValidation';
import DismissKeyboard from '../components/DismissKeyboard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ThemeContext} from '../../context/LayoutContext';

export default LoginScreen = props => {
  // Props & Hooks
  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // setting the navigation styling and content
  useLayoutEffect(() => {
    navigation.setOptions({
      title: login ? 'Login' : 'Sign up',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (login) {
              setLogin(!login);
            } else {
              setLogin(!login);
              setPasswordMatchError('');
            }
          }}>
          <Text style={styles.headerButton}>{login ? 'Sign up' : 'Login'}</Text>
        </TouchableOpacity>
      ),
    });
  });

  // text Validation
  emailVaildation = () => {
    isValid = LoginValidation.isValidEmail(email);

    if (!isValid) {
      setEmailError('Invalid Email address.');
    } else {
      setEmailError('');
    }
    return isValid;
  };

  passwordValidation = () => {
    isValid = LoginValidation.isValidPassword(password);
    if (!isValid) {
      setPasswordError('Password must be at least 8 charchters long.');
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  matchPasswordValidation = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError("Password doesn't match.");
    } else {
      setPasswordMatchError('');
    }
  };

  // Functions
  onButtonPress = () => {
    if (
      !email ||
      !password ||
      emailError ||
      passwordError ||
      passwordMatchError
    )
      return;

    setIsLoading(true);
    // Sign up Case
    if (!login) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          // Creating user profile
          firestore()
            .collection('users')
            .doc(user.user.uid)
            .set({
              userID: user.user.uid,
              email: user.user.email,
              createdAt: new Date().toUTCString(),
              name: '',
              username: '',
              dateOfBirth: '',
              phoneNumber: '',
              gender: '',
              address: '',
              location: '',
            })
            .then(
              // Creating a user object and setting the default app settings.
              firestore().collection('userObjects').doc(user.user.uid).set({
                appTheme: 'light',
              }),
            );
          user.user.sendEmailVerification(); // Navigation will be handeled in the splash screen's onAuthStateChanged
          // Success creating user
          setLogin(true);
          setConfirmPassword('');
          setIsLoading(false);

          Alert.alert(
            'Varification sent.',
            'Verification Code was sent to you email.',
          );
        })
        .catch(error => {
          // Error while creating user
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('This user already exist');
            setLogin(!login);
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('Invalid Email');
          } else {
            return Alert.alert(error.code);
          }
          setIsLoading(false);
        });
    } else {
      // Login Case
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          // Check if the email is varified
          if (auth().currentUser.emailVerified === true) {
            // Case Email is Varified
            // Success login
            setIsLoading(false);
            navigation.reset({
              index: 0,
              routes: [{name: 'DirectScreen'}],
            });
          } else {
            // Case Email is not Varified
            Alert.alert(
              'Email Varification',
              'Email not varified. please check you mail for varification code.',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    auth()
                      .signOut()
                      .catch(error => {
                        console.log(error);
                      });
                    setLogin(true);
                  },
                },
                {
                  text: 'Send New',
                  onPress: () => {
                    auth()
                      .currentUser.sendEmailVerification()
                      .catch(error => {
                        console.log(error);
                      });
                    auth()
                      .signOut()
                      .catch(error => {
                        console.log(error);
                      });
                    Alert.alert('Varification mail sent');
                    setLogin(true);
                  },
                },
              ],
            );
            setIsLoading(false);
          }
        })
        .catch(error => {
          // Error while login
          console.log(error);
          if (error.code === 'auth/network-request-failed') {
            Alert.alert('Network failiar');
          } else if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong Password');
          } else {
            Alert.alert('User not Found. Try to sign up');
            setLogin(!login);
          }

          setIsLoading(false);
        });
    }
  };

  forgetPasswordPressed = () => {
    console.log('pressed');
    // Check if the email is entered with no errors
    if (!email || emailError) {
      Alert.alert('Reset Password', 'Please enter a valid Email and try again');
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .catch(error => {
          console.log(error);
        });
      Alert.alert('Reset Password', 'Reset Password mail was sent.');
    }
  };

  // Styles

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'stretch',
      backgroundColor: themeColors.background,
    },
    headerButton: {
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      color: Colors.white,
      fontSize: 16,
      marginRight: '15%',
    },
    image: {
      width: Constants.screenWidth * 0.4,
      height: Constants.screenWidth * 0.4,
      alignSelf: 'center',
      // top: 5,
      marginBottom: Constants.screenHeight * 0.02,
    },
    text: {
      color: themeColors.titleFont,
      height: '5%',
      width: '80%',
      marginHorizontal: '10%',
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    error: {
      color: Colors.red,
      height: '5%',
      width: '100%',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    icons: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'center',
      marginBottom: Constants.screenHeight * 0.03,
      marginTop: Constants.screenHeight * 0.01,
      marginHorizontal: '10%',
    },
  });

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <SafeAreaView>
          {/* <View> */}
          <Image style={styles.image} source={Images.logo} />
          <Text style={styles.text}>
            {login ? 'Login ' : 'Sign up '} with Email
          </Text>
          {/* Displaying the Error Text incase of Error found */}
          {emailError || passwordError || passwordMatchError ? (
            <Text style={styles.error}>
              {emailError || passwordError || passwordMatchError}
            </Text>
          ) : null}

          <LoginTextInput
            title="Email"
            placeholder="Enter your E-mail"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            erro={emailError}
            secureTextEntry={false}
            onEndEditing={() => {
              emailVaildation();
            }}
            onFocus={() => {
              setEmailError('');
            }}
          />

          <LoginTextInput
            title="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            erro={passwordError}
            secureTextEntry={true}
            onEndEditing={() => {
              passwordValidation();
            }}
            onFocus={() => {
              setPasswordError('');
            }}
          />
          {/* {setPasswordMatchError('')} */}
          {!login ? (
            <LoginTextInput
              title="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
              }}
              secureTextEntry={true}
              onEndEditing={() => {
                matchPasswordValidation();
              }}
              onFocus={() => {
                setPasswordMatchError('');
              }}
            />
          ) : null}

          <Text style={styles.text}>_________ OR _________</Text>
          <View style={styles.icons}>
            <ImageIcon imageSource={Images.facebook} />
            <ImageIcon imageSource={Images.google} />
            <ImageIcon imageSource={Images.apple} />
            <ImageIcon imageSource={Images.phone} />
          </View>
          <LoginButton
            title={login ? 'Login' : 'Sign up'}
            isLoading={isLoading}
            onPress={() => {
              onButtonPress();
            }}
          />
          <TouchableOpacity
            style={{width: Constants.screenWidth * 0.3, alignSelf: 'center'}}
            onPress={forgetPasswordPressed}>
            <Text style={{textAlign: 'center', color: themeColors.titleFont}}>
              Forget Password
            </Text>
          </TouchableOpacity>

          <View></View>
          {/* </View> */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};
