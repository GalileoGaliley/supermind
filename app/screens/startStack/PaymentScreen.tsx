import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import {AppEventsLogger} from 'react-native-fbsdk-next';
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
  useActiveSubs,
  useSubsCount,
  useSubscribes,
} from '../../store/products/products.selectors';
import {getAvailablePurchases, requestSubscription} from 'react-native-iap';
import {CloseCrossIcon} from '../../assets/images/icons/IconPack';
import {openLink} from '../customStack/SettingsScreen';
import {
  addActiveSubsAction,
  setLoading,
} from '../../store/products/products.slice';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({token: '', sku: ''});
  const [showOptions, setShowOptions] = useState(false);

  const animOpacity = useRef(new Animated.Value(0)).current;
  const animHeight = useRef(new Animated.Value(100)).current;

  const countElem = useSubsCount();
  const subscribes = useSubscribes();
  const activeSubs = useActiveSubs();

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
    // @ts-ignore
    if (data && data[0].purchaseStateAndroid === 1) {
      await navigation.navigate('Tabs');

      const subData =
        // @ts-ignore
        subscribes[data[0].productIds[0]].subscriptionOfferDetails[0]
          .pricingPhases.pricingPhaseList;
      const trialUsed = activeSubs.find(
        (item: any) => item.productId === 'org.super_mind.premium.1week.offer',
      );
      if (trialUsed) {
        await AppEventsLogger.logPurchase(
          parseInt(subData[0].priceAmountMicros, 10) / 1000000,
          subData[0].priceCurrencyCode,
        );
      } else if (selected.sku === 'org.super_mind.premium.1week.offer') {
        await AppEventsLogger.logEvent('Trial started', {
          currency: subData[0].priceCurrencyCode,
        });
      } else {
        await AppEventsLogger.logPurchase(
          parseInt(subData[0].priceAmountMicros, 10) / 1000000,
          subData[0].priceCurrencyCode,
        );
      }
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
                ? 'Try for Free'
                : 'Continue'
            }
          />
          {/*<Button onPress={pressed} Icon={<Chevron />} title={'CONtinuE'} />*/}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#23232D',
          }}>
          <TouchableOpacity
            onPress={() =>
              openLink('https://appmediaco.com/SuperMindTermsOfUse.html')
            }
            style={styles.bottomLinks}>
            <Text style={{textAlign: 'center', fontSize: 11}}>EULA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openLink('https://appmediaco.com/SuperMindPolicy.html')
            }
            style={styles.bottomLinks}>
            <Text style={{textAlign: 'center', fontSize: 11}}>Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const activeSub = await getAvailablePurchases();
              if (activeSub.length) {
                await dispatch(addActiveSubsAction(activeSub));
              }
            }}
            style={styles.bottomLinks}>
            <Text style={{textAlign: 'center', fontSize: 11}}>
              Restore purchases
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.videoContainer}>
          <Video
            style={styles.video}
            playInBackground={true}
            resizeMode="cover"
            muted={true}
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
  bottomLinks: {
    width: '33.3%',
    height: 25,
    justifyContent: 'center',
  },
});

export default PaymentScreen;
