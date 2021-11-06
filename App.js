import React from 'react';
import 'react-native-gesture-handler';
import MainStackNavigator from './__appFolders/src/screens/MainStackNavigator';
import LayoutContext from './__appFolders/context/LayoutContext';

export default App = () => {
  return (
    <LayoutContext>
      <MainStackNavigator />
    </LayoutContext>
  );
};
