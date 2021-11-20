import React, {useContext} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Colors from '../../constants/Colors';
import Constants from '../../constants/PhoneDimentions';
import {ThemeContext} from '../../context/LayoutContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default ProfileTextInput = props => {
  const {
    title,
    placeholder,
    value,
    onChangeText,
    onEndEditing,
    keyboardType,
    onFocus,
  } = props;
  const {themeColors} = useContext(ThemeContext);

  // Styles
  const styles = StyleSheet.create({
    topContainer: {
      height: Constants.screenHeight * 0.1,
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
      borderRadius: Constants.screenHeight * 0.01,
      paddingHorizontal: '5%',
      paddingVertical: 10,
      backgroundColor: themeColors.fieldColor,
      color: themeColors.mainFont,
      fontSize: RFPercentage(2),
    },
    text: {
      color: themeColors.titleFont,
      width: '80%',
      marginHorizontal: '10%',
      fontSize: RFPercentage(2),
      textAlign: 'left',
      fontWeight: 'bold',
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
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          keyboardType={keyboardType}
          onFocus={onFocus}
        />
      </View>
    </View>
  );
};
