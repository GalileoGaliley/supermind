import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type OwnProps = {
  name: string;
  price: string;
  period: string;
  token: string;
  selected: boolean;
  onPress: () => void;
};

const PaymentItem = ({name, price, period, onPress, selected}: OwnProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.listItem]}>
      <View style={styles.mainInfo}>
        <View
          style={[
            styles.radio,
            {backgroundColor: selected ? '#fff' : 'rgba(255, 255, 255, 0.2)'},
          ]}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>
            {price}/{period}
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.text, {marginRight: 16}]}>
          {price}/{period}
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
