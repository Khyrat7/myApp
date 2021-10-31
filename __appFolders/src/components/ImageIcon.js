import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from '../../constants/PhoneDimentions';
import Colors from '../../constants/Colors';
const ImageIcon = props => {
  const {imageSource} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={imageSource} />
    </TouchableOpacity>
  );
};

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
    borderColor: Colors.black,
    borderWidth: 0.5,
  },
});

export default ImageIcon;
