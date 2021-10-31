import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import PhoneDimentions from '../../constants/PhoneDimentions';
import Colors from '../../constants/Colors';
import Constants from '../../constants/PhoneDimentions';

const LoginTextInput = props => {
  const {
    title,
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry,
    onEndEditing,
  } = props;

  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          style={styles.inputText}
          placeholder={placeholder}
          placeholderTextColor={Colors.green}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onEndEditing={onEndEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: PhoneDimentions.screenHeight * 0.1,
    marginBottom: Constants.screenHeight * 0.01,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  inputText: {
    flex: 1,
    height: '100%',
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.black,
    marginHorizontal: '10%',
    borderRadius: PhoneDimentions.screenHeight * 0.01,
    paddingHorizontal: '5%',
  },
  text: {
    color: Colors.blue,
    // flex: 1,
    height: '50%',
    width: '80%',
    marginHorizontal: '10%',
    fontSize: 20,
    textAlign: 'left',
  },
});

export default LoginTextInput;
