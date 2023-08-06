import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {useDispatch} from 'react-redux';
import {useUserToken} from '../../../store/user/user.selectors';
import {getPresetsAction} from '../../../store/presets/presets.actions';
import {
  usePresetsIds,
  usePresetsItems, usePresetsLoading,
  usePresetsTitles
} from "../../../store/presets/presets.selectors";
import TitleList from './components/TitleList';
import PresetsList from './components/PresetsList';
import LoadSpin from "../../../components/splashComponent/LoadSpin";

const {height, width} = Dimensions.get('screen');

const ChatsPresetsScreen = () => {
  const [selectedPreset, setSelectedPreset] = useState('All');
  // const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const dispatch = useDispatch();
  const token = useUserToken();

  const chatsPresets = usePresetsItems();
  const loading = usePresetsLoading();
  const chatsPresetsIds = usePresetsIds();
  const titles = usePresetsTitles();

  useEffect(() => {
    if (token) {
      dispatch(getPresetsAction());
    }
  }, [token]);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: '#16171D',
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LoadSpin />
      </View>
    );
  }

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
