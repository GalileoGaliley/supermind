import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {useDispatch} from 'react-redux';
import {useUserToken} from '../../../store/user/user.selectors';
import {getPresetsAction} from '../../../store/presets/presets.actions';
import {
  usePresetsIds,
  usePresetsItems,
  usePresetsTitles,
} from '../../../store/presets/presets.selectors';
import TitleList from './components/TitleList';
import PresetsList from './components/PresetsList';

const {height} = Dimensions.get('window');

const ChatsPresetsScreen = () => {
  const [selectedPreset, setSelectedPreset] = useState('All');
  // const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const dispatch = useDispatch();
  const token = useUserToken();

  const chatsPresets = usePresetsItems();
  const chatsPresetsIds = usePresetsIds();
  const titles = usePresetsTitles();

  useEffect(() => {
    if (token) {
      dispatch(getPresetsAction());
    }
  }, [token]);

  return (
    <View style={styles.back}>
      <TitleList
        titles={titles}
        selectedPreset={selectedPreset}
        setSelectedPreset={setSelectedPreset}
      />
      <PresetsList
        chatsPresets={chatsPresets}
        chatsPresetsIds={chatsPresetsIds}
        selectedPreset={selectedPreset}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#16171D',
    height: height,
  },
});

export default ChatsPresetsScreen;
