import React from 'react';
import {TouchableOpacity} from 'react-native';
import Chevron from '../../../assets/images/icons/Chevron';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../../navigation/types';

const BackButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        transform: [{rotateZ: '180deg'}],
        height: 35,
        width: 35,
      }}
      onPress={() => navigation.goBack()}>
      <Chevron />
    </TouchableOpacity>
  );
};

export default BackButton;
