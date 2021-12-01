import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../constants/Colors';

export const ThemeContext = createContext();

export default LayoutContext = ({children}) => {
  const [theme, setTheme] = useState('light');

  const userID = auth().currentUser ? auth().currentUser.uid : null;

  getUserTheme = async () => {
    try {
      await firestore()
        .collection('userObjects')
        .doc(userID)
        .get()
        .then(user => {
          user.data().appTheme !== null
            ? setTheme(user.data().appTheme)
            : 'light';
        });
    } catch (error) {
      console.log(error);
    }
  };

  userID ? getUserTheme() : null;

  const themeColors = {
    mainFont: theme === 'dark' ? Colors.white : Colors.black,
    titleFont: theme === 'dark' ? Colors.orange : Colors.blue,
    fieldColor: theme === 'dark' ? Colors.Darkgray : Colors.lightWhite,
    background: theme === 'dark' ? Colors.black : Colors.white,
    border: theme === 'dark' ? Colors.white : Colors.black,
    placeholder: theme === 'dark' ? Colors.lightWhite : Colors.Darkgray,
    header: theme === 'dark' ? Colors.Darkgray : Colors.blue,
    buttonColor: theme === 'dark' ? Colors.Darkgray : Colors.blue,
    headerFont: Colors.white,
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme, themeColors}}>
      {children}
    </ThemeContext.Provider>
  );
};
