import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/LayoutContext';

export default Card = props => {
  const {themeColors} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: 10,
      backgroundColor: themeColors.background,
      marginBottom: 20,
      shadowColor: themeColors.border,
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
        width: 2,
        height: 5,
      },
      marginHorizontal: 10,
      // overflow: 'hidden',
    },
  });
  return (
    <View style={{...styles.container, ...props.style}}>{props.children}</View>
  );
};
