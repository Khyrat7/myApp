import React, {useContext} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import PhoneDimentions from '../../constants/PhoneDimentions';
import Colors from '../../constants/Colors';
import Constants from '../../constants/PhoneDimentions';
import {ThemeContext} from '../../context/LayoutContext';

export default LoginTextInput = props => {
  const {
    title,
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry,
    onEndEditing,
    onFocus,
  } = props;

  const {themeColors} = useContext(ThemeContext);

  // Styles
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
      backgroundColor: themeColors.background,
    },
    inputText: {
      flex: 1,
      height: '100%',
      width: '80%',
      borderWidth: 1,
      borderColor: themeColors.border,
      marginHorizontal: '10%',
      borderRadius: PhoneDimentions.screenHeight * 0.01,
      paddingHorizontal: '5%',
      backgroundColor: themeColors.fieldColor,
      color: themeColors.mainFont,
    },
    text: {
      color: themeColors.titleFont,
      // flex: 1,
      height: '50%',
      width: '80%',
      marginHorizontal: '10%',
      fontSize: 20,
      textAlign: 'left',
      backgroundColor: themeColors.background,
    },
  });

  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={themeColors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onEndEditing={onEndEditing}
          onFocus={onFocus}
        />
      </View>
    </View>
  );
};
