import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Text,
  ScrollView,
} from 'react-native';

import Voice from '@react-native-community/voice';
import {
  CrossIcon,
  MicrophoneIcon,
  PaperClipIcon,
  SendMessageIcon,
} from '../../assets/images/icons/IconPack';

type VoiceRecord = {
  pitch: string;
  error: string;
  started: string;
  results: [];
  partialResults: [];
  end: string;
};

const ChatInput = ({openModal, textFromPhoto}: {openModal: () => void, textFromPhoto: string}) => {
  const initSize = 40;
  const animatedSize = useRef(new Animated.Value(initSize)).current;

  const [text, setText] = useState<string>('');
  const [inputHeight, setInputHeight] = useState(50);
  const [started, setStarted] = useState('');
  const [stopped, setStopped] = useState(true);

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const startRecognizing = async () => {
    setStarted('');
    setText('');
    setStopped(false);

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.log(e);
    }
  };
  const stopRecognizing = async () => {
    setStarted('');
    setText('');
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

  const change = (value: string) => {
    setText(value);
  };

  const sendMessage = () => {
    console.log('open modal');
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

  useEffect(() => {
    if (textFromPhoto.length > 0) {
      setText(textFromPhoto);
    }
  }, [textFromPhoto]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.clipContainer}>
        <PaperClipIcon />
      </TouchableOpacity>
      <View style={[styles.inputContainer, {height: inputHeight}]}>
        <TextInput
          style={[styles.input]}
          scrollEnabled={true}
          multiline={true}
          value={text}
          onChangeText={e => change(e)}
          onContentSizeChange={e => {
            if (e.nativeEvent.contentSize.height <= 90) {
              setInputHeight(Math.floor(e.nativeEvent.contentSize.height));
            } else {
              setInputHeight(90);
            }
          }}
          placeholder={'Type a message...'}
          placeholderTextColor={'#69737B'}
          numberOfLines={5}
        />
        {text.length > 0 && stopped ? (
          <View style={styles.sendMessageContainer}>
            <TouchableOpacity
              style={styles.crossIcon}
              onPress={() => setText('')}>
              <CrossIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.iconContainer}>
              <SendMessageIcon />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.microphoneContainer]}>
            <AnimatedTouchable
              onPressOut={stopRecognizing}
              onLongPress={startRecognizing}
              style={[
                {
                  width: animatedSize,
                  height: animatedSize,
                  backgroundColor: '#ff0',
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                stopped ? styles.recordingStop : styles.recording,
              ]}>
              <MicrophoneIcon />
            </AnimatedTouchable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 100,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#1C1C25',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  crossIcon: {
    marginRight: 10,
  },
  microphoneContainer: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginBottom: 6,
    right: 10,
  },
  sendMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  clipContainer: {
    marginBottom: 13,
    marginRight: 15,
  },
  recording: {
    backgroundColor: '#397534',
    borderRadius: 100,
  },
  recordingStop: {
    backgroundColor: '#183716',
    borderRadius: 100,
  },
  input: {
    padding: 16,
    borderRadius: 14,
    color: '#fff',
    // backgroundColor: '#ff0'
    overflow: 'scroll',
    flex: 1,
  },
  inputContainer: {
    borderRadius: 14,
    borderColor: '#183716',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#fff',
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#23232D',
  },
});

export default ChatInput;
