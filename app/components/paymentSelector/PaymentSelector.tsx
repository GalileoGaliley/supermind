import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PaymentItem from './components/PaymentItem';
import {SubData} from '../../store/products/products.types';

type OwnProps = {
  setShowOptions: (T: boolean) => void;
  showOptions: boolean;
  selected: {token: string; sku: string};
  setSelected: (T: {token: string; sku: string}) => void;
  subscribes: {[P: string]: SubData};
};
const PaymentSelector = ({
  showOptions,
  setShowOptions,
  setSelected,
  selected,
  subscribes,
}: OwnProps) => {
  const animHeight = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    const selectData = {
      token:
        subscribes[Object.keys(subscribes)[0]].subscriptionOfferDetails[0]
          .offerToken,
      sku: subscribes[Object.keys(subscribes)[0]].sku,
    };
    if (subscribes && !selected.sku) {
      setSelected(selectData);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.list, {height: animHeight}]}>
        {Object.keys(subscribes).map((item, index) => {
          const detailPos = {
            pos: 0,
          };

          if (subscribes[item].subscriptionOfferDetails.length > 1) {
            detailPos.pos = 1;
          }
          const details =
            subscribes[item].subscriptionOfferDetails[detailPos.pos];

          return (
            <PaymentItem
              index={index}
              showOptions={showOptions}
              price={
                // @ts-ignore
                details.pricingPhases.pricingPhaseList[0].priceAmountMicros /
                1000000
              }
              moneyCode={
                details.pricingPhases.pricingPhaseList[0].priceCurrencyCode
              }
              selected={selected.sku === subscribes[item].sku}
              onPress={() =>
                setSelected({
                  token: details.offerToken,
                  sku: subscribes[item].sku,
                })
              }
              token={details.offerToken}
              name={subscribes[item].name || ''}
              period={subscribes[item].period}
            />
          );
        })}
      </Animated.View>
      <TouchableOpacity
        style={styles.moreOptionButton}
        onPress={showOptions ? closePopup : openPopup}>
        <Text style={{color: '#fff', fontSize: 12}}>
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
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  list: {
    width: '100%',
    bottom: 35,
    position: 'absolute',
    overflow: 'hidden',
    paddingTop: 10,
  },
});

export default PaymentSelector;
