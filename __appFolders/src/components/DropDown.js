import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from '../../constants/PhoneDimentions';
import {ThemeContext} from '../../context/LayoutContext';

export default DropDown = props => {
  // Props & Hooks
  const {
    title,
    open,
    value,
    items,
    setItems,
    setOpen,
    setValue,
    placeholder,
    onChangeValue,
  } = props;

  const {themeColors, theme} = useContext(ThemeContext);

  // Styles
  const styles = StyleSheet.create({
    topContainer: {
      height: Constants.screenHeight * 0.07,
      marginBottom: Constants.screenHeight * 0.01,
    },
    container: {
      flex: 1,
      width: '80%',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: themeColors.background,
      height: 40,
    },
    dropDown: {
      height: '100%',
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: Constants.screenHeight * 0.01,
      paddingHorizontal: '5%',
      paddingVertical: '1%',
      color: themeColors.mainFont,
      backgroundColor: themeColors.fieldColor,
    },
    text: {
      color: themeColors.titleFont,
      width: '80%',
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 'bold',
    },
  });

  return (
    <>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.container}>
          <DropDownPicker
            placeholder={placeholder}
            style={styles.dropDown}
            theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
            // color={theme === 'dark'? }
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={onChangeValue}
            dropDownDirection="AUTO"
            // mode="BADGE"
            bottomOffset={100}
            listMode="MODAL"
          />
        </View>
      </View>
    </>
  );
};
