import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  CrossIcon,
  PaperClipIcon,
  SendMessageIcon,
} from '../../assets/images/icons/IconPack';

import ChatModal from './components/ChatModal';
import TextRecognition from 'react-native-text-recognition';
import Microphone from './components/Microphone';
import {useFreeRequests} from '../../store/user/user.selectors';
import {useDispatch} from 'react-redux';
import {changeFreeRequest} from '../../store/user/user.slice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigation/types';
import {useActiveSubs} from '../../store/products/products.selectors';

const {width, height} = Dimensions.get('screen');
const ChatInput = ({sendMessage}: {sendMessage: (T: string) => void}) => {
  const [text, setText] = useState<string>('');
  const [inputHeight, setInputHeight] = useState(50);
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const [stopped, setStopped] = useState(true);

  const activeSubs = useActiveSubs();
  const freeRequests = useFreeRequests();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [textFromPhoto, setTextFromPhoto] = useState<string>('');

  const detectTextFromPhoto = async (image: string) => {
    setShowModal(false);
    try {
      const text = await TextRecognition.recognize(image, {});
      setTextFromPhoto(text.join('\n'));
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const change = (value: string) => {
    setText(value);
  };

  const send = () => {
    if (
      (freeRequests && freeRequests > 0) ||
      (activeSubs &&
        activeSubs.length > 0 &&
        activeSubs[0].purchaseStateAndroid === 1)
    ) {
      sendMessage(text);
      setText('');
      dispatch(changeFreeRequest(''));
    } else {
      navigation.navigate('PaymentScreen');
    }
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
      {showModal ? (
        <TouchableOpacity
          onPress={closeModal}
          style={{
            width: width,
            height: height,
            position: 'absolute',
          }}
        />
      ) : null}
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
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  crossIcon: {
    marginRight: 10,
    padding: 10,
  },
  sendMessageContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  clipContainer: {
    marginRight: 5,
    marginLeft: -5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
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
