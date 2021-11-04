import React, {useContext} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from '../../constants/PhoneDimentions';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';

export default ImageIcon = props => {
  const {imageSource} = props;
  const {themeColors} = useContext(ThemeContext);

  // Styles
  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      alignItems: 'center',
      marginHorizontal: '5%',
    },
    image: {
      borderRadius: Constants.screenHeight * 0.05,
      height: Constants.screenHeight * 0.05,
      width: Constants.screenHeight * 0.05,
      borderColor: themeColors.border,
      borderWidth: 0.5,
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={imageSource} />
    </TouchableOpacity>
  );
};
