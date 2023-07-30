import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import {
  CrossIcon,
  PaperClipIcon,
  SendMessageIcon,
} from '../../assets/images/icons/IconPack';

import ChatModal from './components/ChatModal';
import TextRecognition from 'react-native-text-recognition';
import Microphone from './components/Microphone';

const ChatInput = ({sendMessage}: {sendMessage: (T: string) => void}) => {
  const [text, setText] = useState<string>('');
  const [inputHeight, setInputHeight] = useState(50);
  const [stopped, setStopped] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [proccessing, setProccessing] = useState<boolean>(false);
  const [textFromPhoto, setTextFromPhoto] = useState<string>('');

  const detectTextFromPhoto = async (image: string) => {
    setShowModal(false);
    await setProccessing(true);
    try {
      const text = await TextRecognition.recognize(image, {});
      setTextFromPhoto(text.join('\n'));
      await setProccessing(false);
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  const change = (value: string) => {
    setText(value);
  };

  const send = () => {
    sendMessage(text);
    setText('');
  };

  useEffect(() => {
    if (textFromPhoto.length > 0) {
      setText(textFromPhoto);
    }
  }, [textFromPhoto]);

  return (
    <>
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
              <TouchableOpacity onPress={send} style={styles.iconContainer}>
                <SendMessageIcon />
              </TouchableOpacity>
            </View>
          ) : (
            <Microphone
              setStopped={setStopped}
              stopped={stopped}
              change={change}
            />
          )}
        </View>
      </View>
      <ChatModal detectTextFromPhoto={detectTextFromPhoto} show={showModal} />
    </>
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
  sendMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  clipContainer: {
    marginBottom: 13,
    marginRight: 15,
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
