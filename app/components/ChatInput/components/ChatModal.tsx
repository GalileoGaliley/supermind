import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CameraIcon,
  GalleryIcon,
  MicrophoneIcon,
} from '../../../assets/images/icons/IconPack';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type OwnProps = {
  show: boolean;
  detectTextFromPhoto: (t: string) => void;
};

const ChatModal = ({show, detectTextFromPhoto}: OwnProps) => {
  const initPos = -100;
  const showedPos = 80;

  const [image, setImage] = useState<ImagePickerResponse>({});

  const animatedPos = useRef(new Animated.Value(initPos)).current;

  useEffect(() => {
    if (show) {
      Animated.timing(animatedPos, {
        toValue: showedPos,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedPos, {
        toValue: initPos,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  useEffect(() => {
    if (image && image.assets?.length && image.assets[0].uri) {
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

  return (
    <Animated.View style={[styles.modalContainer, {bottom: animatedPos}]}>
      <TouchableOpacity onPress={openCamera} style={styles.modalItem}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          />
          <CameraIcon />
        </View>
        <Text style={styles.title}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openGallery} style={styles.modalItem}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          />
          <GalleryIcon />
        </View>
        <Text style={styles.title}>Gallery</Text>
      </TouchableOpacity>
      <BlurView style={styles.absolute} blurType="transparent" blurRadius={3} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    backgroundColor: 'rgba(20, 20, 20, 0.5)',
    position: 'absolute',
    width: 150,
    height: 130,
    backfaceVisibility: 'hidden',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingLeft: 10,
    borderRadius: 10,
    left: 10,
    zIndex: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 150,
    height: 130,
    zIndex: -1,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    borderRadius: 15,
    height: '100%',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16171d',
  },
  title: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
});
export default ChatModal;
