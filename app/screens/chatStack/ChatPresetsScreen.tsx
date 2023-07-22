import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

import {useDispatch} from 'react-redux';
import {useUserToken} from '../../store/user/user.selectors';
import {getPresetsAction} from '../../store/presets/presets.actions';
import {usePresets} from '../../store/presets/presets.selectors';
import PromptTile from '../../components/Tiles/PromptTile';

const {width, height} = Dimensions.get('window');

const ChatsPresetsScreen = () => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const dispatch = useDispatch();
  const token = useUserToken();

  const chatsPresets = usePresets();

  useEffect(() => {
    if (token) {
      dispatch(getPresetsAction());
    }
  }, [token]);

  return (
    <>
      <ScrollView horizontal={true} style={styles.selector}>

      </ScrollView>
      <ScrollView style={styles.container}>
        {/*{chatsPresets.length*/}
        {/*  ? chatsPresets.map(item => {*/}
        {/*      return (*/}
        {/*        <View style={styles.tileContainer} key={item.id}>*/}
        {/*          <Text style={styles.listTitle}>{item.title}</Text>*/}
        {/*          {item.presets.map(item => (*/}
        {/*            <PromptTile*/}
        {/*              id={item.id}*/}
        {/*              title={item.title}*/}
        {/*              desc={item.desc}*/}
        {/*            />*/}
        {/*          ))}*/}
        {/*        </View>*/}
        {/*      );*/}
        {/*    })*/}
        {/*  : null}*/}
        <View style={styles.holder} />
      </ScrollView>
    </>
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
  },
  tileContainer: {
    paddingHorizontal: 10,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
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
  selector: {
    paddingTop: 82,
    backgroundColor: '#16171D',
    height: 50,
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

export default ChatsPresetsScreen;
