import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import PhoneDimentions from '../../constants/PhoneDimentions';
import Colors from '../../constants/Colors';
import Constants from '../../constants/PhoneDimentions';

const ProfileTextInput = props => {
  const {title, placeholder, value, onChangeText} = props;

  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: PhoneDimentions.screenHeight * 0.07,
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
    paddingVertical: '1%',
  },
  text: {
    color: Colors.blue,
    width: '80%',
    marginHorizontal: '10%',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

export default ProfileTextInput;
