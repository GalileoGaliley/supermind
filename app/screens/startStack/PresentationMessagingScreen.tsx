import React, {useEffect, useRef} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamsList} from '../../navigation/types';
// @ts-ignore
import chat from '../../../app/assets/videos/8_1.mp4';
// @ts-ignore
import PoweredByIc from '../../assets/images/icons/PoweredBy';
import Button from '../../components/button';
import Chevron from '../../assets/images/icons/Chevron';

const {width, height} = Dimensions.get('window');

const PresentationMessagingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      // @ts-ignore
      videoRef.current.play();
    }
  }, []);

  const press = () => {
    navigation.navigate('SecondPresentationMessagingScreen', undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.next}>
        <Button onPress={press} Icon={<Chevron />} title={'Continue'} />
      </View>
      <View style={styles.videoContainer}>
        <Video
          style={styles.video}
          playInBackground={true}
          resizeMode="cover"
          source={chat}
          repeat={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#16171d',
    paddingTop: 42,
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

export default PresentationMessagingScreen;
