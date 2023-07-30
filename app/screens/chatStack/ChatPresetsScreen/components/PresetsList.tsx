import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PromptTile from '../../../../components/Tiles/PromptTile';
import {Preset} from '../../../../store/presets/presets.types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../../../navigation/types';

type OwnProps = {
  chatsPresets: {[p: number]: Preset};
  chatsPresetsIds: {[p: string]: number[]};
  selectedPreset: string;
};
const PresetsList = ({
  chatsPresets,
  chatsPresetsIds,
  selectedPreset,
}: OwnProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const onClick = (prompt: string) => {
    navigation.navigate('ChatNavigation', {
      screen: 'ChatScreen',
      params: {
        data: {
          id: 0,
          messages: [{content: prompt, role: 'user'}],
          createdAt: '',
        },
      },
    });
  };

  return (
    <ScrollView style={styles.tileList} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {chatsPresets
          ? chatsPresetsIds[selectedPreset] &&
            chatsPresetsIds[selectedPreset].map(item => {
              return (
                <PromptTile
                  onClick={() => onClick(chatsPresets[item].desc)}
                  id={chatsPresets[`${item}`].id}
                  title={chatsPresets[item].title}
                  desc={chatsPresets[item].desc}
                  mr={0}
                />
              );
            })
          : null}
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tileList: {
    width: '100%',
    height: '100%',
    backgroundColor: '#16171D',
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 32,
    width: '100%',
    height: '100%',
  },
});
export default PresetsList;
