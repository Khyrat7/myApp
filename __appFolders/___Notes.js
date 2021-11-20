import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state', // passing the warning header ( all text before the : )
]);

// ____________ used to ignore warnings____________
