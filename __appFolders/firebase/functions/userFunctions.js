import firestore from '@react-native-firebase/firestore';

export function getUseData(uid) {
  const ref = firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(user => {
      const val = user.data();
      return val;
    })
    .catch(error => {
      console.log(error);
    });

  return ref;
}
