import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity, Share
} from "react-native";
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
import {
  useSubsCount,
  useSubscribes,
} from '../../store/products/products.selectors';
import {requestSubscription} from 'react-native-iap';
import {CloseCrossIcon} from '../../assets/images/icons/IconPack';

const {width, height} = Dimensions.get('window');

const PaymentScreen = () => {
  const [selected, setSelected] = useState({token: '', sku: ''});
  const [showOptions, setShowOptions] = useState(false);

  const animOpacity = useRef(new Animated.Value(0)).current;
  const animHeight = useRef(new Animated.Value(100)).current;

  const countElem = useSubsCount();
  const subscribes = useSubscribes();

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

  const press = async () => {
    const data = await requestSubscription({
      subscriptionOffers: [{offerToken: selected.token, sku: selected.sku}],
    });
    if (data) {
      await Share.share({
        message: JSON.stringify(data),
      });
    }
  };

  const pressed = async () => {
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.cross} onPress={pressed}>
        <CloseCrossIcon />
      </TouchableOpacity>
      <LinearGradient
        colors={[
          '#16171D',
          'rgba(10, 10, 40, 0.7)',
          !showOptions ? 'transparent' : 'rgba(0, 0, 0, 0.6)',
          'rgba(10, 10, 40, 0.7)',
          '#16171D',
        ]}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 0.1, 0.5, 0.9, 1]}>
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
                fontSize: 23,
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
                marginTop: 10,
              }}>
              Try 3 days free, then $5,99/week {'\n'}
              Auto-renewable. Cancel anytime.
            </Text>
          </Animated.View>
          <PaymentSelector
            subscribes={subscribes}
            selected={selected}
            setSelected={setSelected}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
          />
          <Button
            onPress={press}
            Icon={<Chevron />}
            title={
              selected.sku === 'org.super_mind.premium.1week.offer'
                ? 'Try for free'
                : 'Continue'
            }
          />
          {/*<Button onPress={pressed} Icon={<Chevron />} title={'CONtinuE'} />*/}
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
  cross: {
    position: 'absolute',
    right: 30,
    top: 70,
    zIndex: 99,
  },
});

export default PaymentScreen;
