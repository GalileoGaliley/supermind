import React, {useEffect, useRef, useState} from 'react';
import {MicrophoneIcon} from '../../../assets/images/icons/IconPack';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import Voice from '@react-native-community/voice';

type OwnProps = {
  change: (T: string) => void;
  setStopped: (T: boolean) => void;
  stopped: boolean;
};

const Microphone = ({change, setStopped, stopped}: OwnProps) => {
  const initSize = 40;
  const animatedSize = useRef(new Animated.Value(initSize)).current;

  const [started, setStarted] = useState(false);

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const startRecognizing = async () => {
    setStarted(true);
    change('');
    setStopped(false);

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecognizing = async () => {
    setStarted(false);
    change('');
    setStopped(true);
    Animated.timing(animatedSize, {
      toValue: initSize,
      duration: 5,
      useNativeDriver: false,
    }).start();
    try {
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const onSpeechStart = (e: any) => {
    setStarted(e.value);
  };

  const onSpeechEnd = () => {
    Animated.timing(animatedSize, {
      toValue: initSize,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const onSpeechPartialResults = (e: any) => {
    change(e.value[0]);
  };

  const onSpeechResults = (e: any) => {
    setStopped(true);
    Animated.timing(animatedSize, {
      toValue: initSize,
      duration: 500,
      useNativeDriver: false,
    }).start();
    change(e.value[0]);
  };

  const onSpeechVolumeChanged = async (e: any) => {
    if (e.value > 1) {
      await Animated.timing(animatedSize, {
        toValue: initSize * (Math.ceil(e.value) / 2),
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const onSpeechError = () => {
    stopRecognizing();
  };

  useEffect((): (() => void) => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      return Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={[styles.microphoneContainer]}>
      <AnimatedTouchable
        onPressOut={stopRecognizing}
        onPressIn={startRecognizing}
        style={[
          {
            width: animatedSize,
            height: animatedSize,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          },
          stopped ? styles.recordingStop : styles.recording,
        ]}>
        <MicrophoneIcon />
      </AnimatedTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  microphoneContainer: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginBottom: 6,
    right: 10,
  },
  recording: {
    backgroundColor: '#397534',
    borderRadius: 100,
  },
  recordingStop: {
    backgroundColor: '#183716',
    borderRadius: 100,
  },
});

export default Microphone;
