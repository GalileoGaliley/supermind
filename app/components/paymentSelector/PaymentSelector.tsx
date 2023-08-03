import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PaymentItem from './components/PaymentItem';
import {useSubscribes} from '../../store/products/products.selectors';

type OwnProps = {
  setShowOptions: (T: boolean) => void;
  showOptions: boolean;
  selected: string;
  setSelected: (T: string) => void;
};
const PaymentSelector = ({
  showOptions,
  setShowOptions,
  setSelected,
  selected,
}: OwnProps) => {
  const animHeight = useRef(new Animated.Value(0)).current;

  const subscribes = useSubscribes();

  const openPopup = () => {
    Animated.timing(animHeight, {
      duration: 500,
      toValue: Object.keys(subscribes).length * 62,
      useNativeDriver: false,
    }).start();
    setShowOptions(true);
  };

  const closePopup = () => {
    Animated.timing(animHeight, {
      duration: 500,
      toValue: 0,
      useNativeDriver: false,
    }).start();
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.list, {height: animHeight}]}>
        {Object.keys(subscribes).map(item => {
          return (
            <PaymentItem
              price={
                subscribes[item].subscriptionOfferDetails[0].pricingPhases
                  .pricingPhaseList[0].formattedPrice
              }
              selected={
                selected ===
                subscribes[item].subscriptionOfferDetails[0].offerToken
              }
              onPress={() =>
                setSelected(
                  subscribes[item].subscriptionOfferDetails[0].offerToken,
                )
              }
              token={subscribes[item].subscriptionOfferDetails[0].offerToken}
              name={subscribes[item].name || ''}
              period={subscribes[item].period}
            />
          );
        })}
      </Animated.View>
      <TouchableOpacity
        style={styles.moreOptionButton}
        onPress={showOptions ? closePopup : openPopup}>
        <Text style={{color: '#fff'}}>
          {showOptions ? 'Hide options ▼' : 'More options ▲'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  moreOptionButton: {
    backgroundColor: 'rgba(155,155,155,0.2)',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  list: {
    width: '100%',
    bottom: 35,
    position: 'absolute',
    overflow: 'hidden',
  },
});

export default PaymentSelector;
