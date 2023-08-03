import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamsList} from '../../navigation/types';
// @ts-ignore
import robot from '../../../app/assets/videos/robot_v3.mp4';
import Button from '../../components/button';
import Chevron from '../../assets/images/icons/Chevron';
import PaymentPrompts from '../../components/paymentPrompts/PaymentPrompts';
import PaymentSelector from '../../components/paymentSelector/PaymentSelector';
import {useSubsCount} from '../../store/products/products.selectors';
import {requestSubscription} from 'react-native-iap';

const {width, height} = Dimensions.get('window');

const PaymentScreen = () => {
  const [selected, setSelected] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const animOpacity = useRef(new Animated.Value(0)).current;
  const animHeight = useRef(new Animated.Value(100)).current;

  const countElem = useSubsCount();

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      // @ts-ignore
      videoRef.current.play();
    }
  }, []);

  useEffect(() => {
    Animated.timing(animOpacity, {
      useNativeDriver: false,
      duration: 300,
      toValue: !showOptions ? 1 : 0,
    }).start();
    Animated.timing(animHeight, {
      useNativeDriver: false,
      duration: 300,
      toValue: !showOptions ? 130 : 65,
    }).start();
  }, [showOptions]);

  const press = () => {
    requestSubscription({
      subscriptionOffers: [
        {offerToken: selected, sku: 'org.super_mind.premium.1week.offer'},
      ],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          '#16171D',
          'rgba(0, 0, 0, 0.7)',
          'transparent',
          'rgba(0, 0, 0, 0.7)',
          '#16171D',
        ]}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[
          0,
          !showOptions ? 0.15 : 0.25,
          0.5,
          !showOptions ? 0.85 : 0.75,
          1,
        ]}>
        <Animated.View style={{opacity: animOpacity, width: width}}>
          <PaymentPrompts />
        </Animated.View>
        <View style={styles.next}>
          <Animated.View
            style={{
              height: animHeight,
              transform: [
                {
                  translateY: animOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-(70 * countElem), 0],
                  }),
                },
              ],
              overflow: 'hidden',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 26,
                height: 36,
                textAlign: 'center',
              }}>
              Ready to get started?
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 5,
              }}>
              Unlock unlimited Access
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 15,
              }}>
              Try 3 days free, then $5,99/week {'\n'}
              Auto-renewable. Cancel anytime.
            </Text>
          </Animated.View>
          <PaymentSelector
            selected={selected}
            setSelected={setSelected}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
          />
          <Button onPress={press} Icon={<Chevron />} title={'Continue'} />
        </View>
        <View style={styles.videoContainer}>
          <Video
            style={styles.video}
            playInBackground={true}
            resizeMode="cover"
            source={robot}
            repeat={true}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
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
  gradient: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16171d',
    paddingTop: 42,
    height: height,
  },
});

export default PaymentScreen;
