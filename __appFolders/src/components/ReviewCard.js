import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Rating, AirbnbRating} from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore';

import {ThemeContext} from '../../context/LayoutContext';
import Constants from '../../constants/PhoneDimentions';
import Card from './Card';
import Colors from '../../constants/Colors';
import {formatDateLong} from '../../modules/DateModule';
import Images from '../../constants/Images';

export default CartCard = props => {
  // Props and Hooks
  const {review} = props;
  const {themeColors} = useContext(ThemeContext);
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  let reviewTextTrim = review.review.trim();

  useEffect(() => {
    getUserPhoto();
  }, [review.userID]);

  const getUserPhoto = useCallback(async userID => {
    try {
      await firestore()
        .collection('users')
        .doc(review.userID)
        .get()
        .then(document => {
          setImage(document.data().imageURL);
          setUsername(document.data().name);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Styles
  const styles = StyleSheet.create({
    card: {
      paddingVertical: 6,
    },
    headerContainer: {
      flexDirection: 'row',
      alignContent: 'center',
      paddingHorizontal: 10,
      width: '100%',
      justifyContent: 'space-between',
    },
    image: {
      height: Constants.screenHeight * 0.05,
      width: Constants.screenHeight * 0.05,
      borderRadius: Constants.screenHeight * 0.025,
      borderColor: themeColors.border,
      borderWidth: 1,
    },
    headerName: {
      paddingHorizontal: 10,
      fontWeight: 'bold',
      color: themeColors.mainFont,
    },
    headerDate: {
      paddingHorizontal: 10,
      color: themeColors.mainFont,
    },
    separator: {
      alignSelf: 'center',
      width: '100%',
      borderColor: themeColors.border,
      borderWidth: 0.4,
      height: 1,
      marginVertical: 5,
    },
    reviewText: {
      color: themeColors.mainFont,
      fontSize: RFPercentage(2.5),
      marginHorizontal: 10,
      marginVertical: 10,
    },
  });

  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={image ? {uri: image} : Images.defaultUserPhoto}
        />
        <View style={{justifyContent: 'space-between'}}>
          <Text style={styles.headerName}>{username}</Text>
          <Text style={styles.headerDate}>
            {formatDateLong(review.reviewDate)}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <AirbnbRating
            defaultRating={review.rating}
            showRating={false}
            reviewSize={RFPercentage(1)}
            size={RFPercentage(2)}
            isDisabled={true}
          />
        </View>
      </View>
      {reviewTextTrim !== '' ? (
        <View>
          <View style={styles.separator}></View>

          <Text style={styles.reviewText}>{review.review}</Text>
        </View>
      ) : null}
    </Card>
  );
};
