import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type OwnProps = {
  onPress: () => void;
  title: string;
  Icon?: JSX.Element;
};

export default ({onPress, title, Icon}: OwnProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#F70776', '#025CF8']}
        style={styles.gradient}>
        <Text style={styles.buttonTitle}>{title}</Text>
        <View style={styles.icon}>{Icon ? Icon : null}</View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 315,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 14,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  buttonTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  gradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 14,
  },
});
