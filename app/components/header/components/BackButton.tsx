import React from 'react';
import {TouchableOpacity} from 'react-native';
import Chevron from '../../../assets/images/icons/Chevron';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../../navigation/types';

const HeaderButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <TouchableOpacity
      style={{marginHorizontal: 10, transform: [{rotateZ: '180deg'}]}}
      onPress={() => navigation.goBack()}>
      <Chevron />
    </TouchableOpacity>
  );
};

export default HeaderButton;
