import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = props => {
  Icon.loadFont();

  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      iconSize={props.iconSize}
      color={Colors.white}
    />
  );
};

export default CustomHeaderButton;
