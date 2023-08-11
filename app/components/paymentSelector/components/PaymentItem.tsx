import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type OwnProps = {
  name: string;
  moneyCode: string;
  price: string;
  period: string;
  token: string;
  selected: boolean;
  onPress: () => void;
};

const PaymentItem = ({
  name,
  price,
  period,
  onPress,
  selected,
  moneyCode,
}: OwnProps) => {
  const periods: {[p: string]: number} = {
    week: 1,
    month: 4,
    year: 52,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.listItem, {borderWidth: selected ? 1 : 0}]}>
      <View style={styles.mainInfo}>
        <View
          style={[
            styles.radio,
            {backgroundColor: selected ? '#fff' : 'rgba(255, 255, 255, 0.2)'},
          ]}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.text, {fontWeight: '300'}]}>{name}</Text>
          <Text style={styles.text}>
            {`${price} ${moneyCode}`}/{period}
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.text, {marginRight: 16, fontSize: 11}]}>
          {parseInt(String(parseInt(price, 10) / periods[period]), 10)}{' '}
          {moneyCode}/week
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 52,
    backgroundColor: 'rgba(155,155,155,0.2)',
    width: '100%',
    borderRadius: 10,
    borderColor: '#fff',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainInfo: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  radio: {
    height: 16,
    width: 16,
    borderRadius: 16,
    marginHorizontal: 18,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default PaymentItem;
