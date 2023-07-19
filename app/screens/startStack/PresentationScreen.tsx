import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamsList} from '../../navigation/types';
// @ts-ignore
import Button from '../../components/button';
import PresentationPrompts from '../../components/presentationPrompts';
import Chevron from '../../assets/images/icons/Chevron';

const {width, height} = Dimensions.get('window');

const GreetingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const press = () => {
    navigation.navigate('GreetingScreen', undefined);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>What can I do?</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>“Whatever you want!”</Text>
        </View>
      </View>
      <View style={styles.prompts}>
        <PresentationPrompts />
      </View>
      <View style={styles.next}>
        <Button onPress={press} Icon={<Chevron />} title={'Continue'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16171d',
    paddingTop: 22,

    shadowColor: '#000000',
    shadowOffset: {width: 5000, height: 5003},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  prompts: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
  },
  subTitle: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 16,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 14,
    marginBottom: 15,
  },
  videoContainer: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: -1,
    top: 0,
    left: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    height: 100,
    width: 300,
  },
  next: {
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default GreetingScreen;
