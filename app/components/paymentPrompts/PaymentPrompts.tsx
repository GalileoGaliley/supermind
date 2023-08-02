import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  NoAds,
  Speedometer,
  TaskHistory,
  UnlimidedMessages,
} from '../../assets/images/icons/IconPack';

const PaymentPrompts = () => {
  const firstColors = ['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)'];

  const secondColors = ['rgba(101, 14, 141, 0.7)', 'rgba(37, 83, 137, 0.7)'];
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.box, {position: 'absolute', top: 113, left: 63}]}>
          <LinearGradient
            colors={firstColors}
            start={{x: 0.0887, y: 0.2941}}
            end={{x: 0.96, y: 0.9394}}
            style={styles.gradient}>
            <UnlimidedMessages />
            <Text style={styles.text}>Unlimited dialogues</Text>
          </LinearGradient>
        </View>
        <View style={[styles.box, {position: 'absolute', top: 279, right: 30}]}>
          <LinearGradient
            colors={firstColors}
            start={{x: 0.0887, y: 0.2941}}
            end={{x: 0.96, y: 0.9394}}
            locations={[-0.2692, 0.9263]}
            style={styles.gradient}>
            <TaskHistory />
            <Text style={styles.text}>Tasks history</Text>
          </LinearGradient>
        </View>
        <View style={[styles.box, {position: 'absolute', top: 330, left: 40}]}>
          <LinearGradient
            colors={secondColors}
            start={{x: 0.0887, y: 0.2941}}
            end={{x: 0.96, y: 0.9394}}
            style={styles.gradient}>
            <Speedometer />
            <Text style={styles.text}>Fast replies</Text>
          </LinearGradient>
        </View>
        <View
          style={[styles.box, {position: 'absolute', top: 430, right: 113}]}>
          <LinearGradient
            colors={secondColors}
            start={{x: 0.0887, y: 0.2941}}
            end={{x: 0.96, y: 0.9394}}
            locations={[-0.2692, 0.9263]}
            style={styles.gradient}>
            <NoAds />
            <Text style={styles.text}>No ads</Text>
          </LinearGradient>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  box: {
    borderRadius: 10,
  },
  gradient: {
    minHeight: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    border: '10px solid',
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    color: '#fff',
    fontWeight: '400',
  },
  messageContainer: {
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#07B548',
    marginHorizontal: 10,
    fontSize: 17,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#07B548',
    opacity: 0.3,
  },
});

export default PaymentPrompts;
