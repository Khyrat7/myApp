import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';

export const getUserProfileSuccess = profile => {
  return {
    type: types.GET_USER_PROFILE_SUCCESS,
    profile,
  };
};

//
//
//
//
//
//
//
//
//
//
// ________________________ Thunks ________________________

export const getUserProfile = userID => {
  return async dispatch => {
    var profile = {};
    await firestore()
      .collection('users')
      .doc(userID)
      .get()
      .then(pro => {
        profile = pro.data();
      })
      .catch(error => {
        throw error;
      });
    dispatch({type: types.GET_USER_PROFILE_SUCCESS, profile: profile});
  };
};
