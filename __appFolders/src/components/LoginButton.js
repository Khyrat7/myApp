import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PhoneDimentions from '../../constants/PhoneDimentions';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../context/LayoutContext';

export default LoginButton = props => {
  const {isLoading, onPress, title} = props;
  const {themeColors} = useContext(ThemeContext);

  // Styles
  const styles = StyleSheet.create({
    topContainer: {
      height: PhoneDimentions.screenHeight * 0.05,
      marginBottom: 10,
    },
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
    },
    button: {
      textAlign: 'center',
      justifyContent: 'center',
      color: Colors.white,
      alignContent: 'center',
      alignSelf: 'center',
      flex: 1,
      width: '50%',
      backgroundColor: themeColors.buttonColor,
      borderRadius: PhoneDimentions.screenHeight * 0.05,
    },
    title: {
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.topContainer}>
      {isLoading ? (
        <TouchableOpacity style={styles.button}>
          <ActivityIndicator
            style={styles.title}
            color={Colors.white}
            size="small"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
