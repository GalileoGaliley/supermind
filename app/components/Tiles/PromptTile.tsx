import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {rubikBold} from '../../style/font';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigation/types';

type OwnProps = {
  id: number;
  title: string;
  desc: string;
  onClick: () => void;
  mr?: number;
  prompt?: string;
};

const {width} = Dimensions.get('screen');

const PromptTile = ({
  id,
  title,
  desc,
  prompt = '',
  mr = 20,
  onClick,
}: OwnProps) => {
  const splitedString = title.split('\n');
  const w = id === 1 ? 114 : width / 2 - 20;

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.tileContainer, {width: w, height: 110, marginRight: mr}]}>
      <Text style={styles.icon}>{splitedString[0]}</Text>
      <Text style={styles.title}>{splitedString[1]}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: '#23232D',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  icon: {
    marginTop: 0,
    color: '#fff',
    fontSize: 24,
  },
  desc: {
    color: '#69737B',
    fontSize: 10,
    fontFamily: rubikBold,
  },
});
export default PromptTile;
