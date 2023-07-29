import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

import TextRecognition from 'react-native-text-recognition';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

import PromptsScroll from '../../components/Tiles/PromptsScroll';
import {useDispatch} from 'react-redux';
import {fetchChatPromoAction} from '../../store/chatsPromo/chatsPromo.actions';
import {usePrompts} from '../../store/chatsPromo/chatsPromo.selectors';
import {useUserToken} from '../../store/user/user.selectors';
import PromptList from '../../components/Tiles/PromptList';
import ChatInput from '../../components/ChatInput/ChatInput';
import ChatModal from '../../components/ChatInput/components/ChatModal';

const {width, height} = Dimensions.get('window');

const ChatsPromptsScreen = () => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const dispatch = useDispatch();
  const token = useUserToken();

  const chatsPrompts = usePrompts();

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<ImagePickerResponse>({});
  const [textFromPhoto, setTextFromPhoto] = useState<string>('');

  const detectTextFromPhoto = async (image: string) => {
    try {
      const text = await TextRecognition.recognize(image, {});
      setTextFromPhoto(text.join(' '));
      console.log(text);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (image && image.assets?.length && image.assets[0].uri) {
      console.log(image.assets[0].uri);
      detectTextFromPhoto(image.assets[0].uri);
    }
  }, [image]);

  const openCamera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };
    await launchCamera(options, result => setImage(result));
  };

  const openGallery = async () => {
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
    };
    await launchImageLibrary(options, result => setImage(result));
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchChatPromoAction());
    }
  }, [token]);

  const openModal = () => {
    setShowModal(!showModal);
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        {chatsPrompts.length ? (
          <React.Fragment key={chatsPrompts[0].id}>
            <Text style={styles.listTitle}>{chatsPrompts[0].title}</Text>
            <PromptsScroll
              updated_at={chatsPrompts[0].updated_at}
              created_at={chatsPrompts[0].created_at}
              chatsPrompt={chatsPrompts[0].chatsPrompt}
              title={chatsPrompts[0].title}
              id={1}
            />
          </React.Fragment>
        ) : null}
        {chatsPrompts
          ? chatsPrompts.slice(1).map(item => {
              console.log(item.title);
              return (
                <React.Fragment key={item.id}>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <PromptList
                    id={item.id}
                    title={item.title}
                    created_at={item.created_at}
                    updated_at={item.created_at}
                    chatsPrompt={item.chatsPrompt}
                  />
                </React.Fragment>
              );
            })
          : null}
        <View style={styles.holder} />
      </ScrollView>
      <ChatModal
        openCamera={openCamera}
        openGalery={openGallery}
        show={showModal}
      />
      <ChatInput textFromPhoto={textFromPhoto} openModal={openModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#fff',
  },
  holder: {
    height: 82,
  },
  container: {
    position: 'relative',
    backgroundColor: '#16171D',
    paddingTop: 82,
  },
  prompts: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 30,
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
  back: {
    width: width * 1.5,
    height: width * 1.5,
    position: 'absolute',
    top: width / 2.5,
    right: -50,
    zIndex: -2,
  },
});

export default ChatsPromptsScreen;
