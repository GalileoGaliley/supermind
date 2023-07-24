import React from 'react';
import {TouchableOpacity} from 'react-native';

const HeaderButton = ({
  callback,
  Icon,
}: {
  callback: () => void;
  Icon: JSX.Element;
}) => {
  return (
    <TouchableOpacity style={{marginHorizontal: 10}} onPress={callback}>
      {Icon}
    </TouchableOpacity>
  );
};

export default HeaderButton;
