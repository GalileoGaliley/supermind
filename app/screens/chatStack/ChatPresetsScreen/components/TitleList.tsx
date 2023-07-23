import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type OwnProps = {
  titles: string[];
  selectedPreset: string;
  setSelectedPreset: (p: string) => void;
};
const TitleList = ({titles, selectedPreset, setSelectedPreset}: OwnProps) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={true}
      style={styles.selectorContainer}>
      <View style={styles.selector}>
        {titles.length
          ? titles.map(item => {
              return (
                <TouchableOpacity onPress={() => setSelectedPreset(item)}>
                  <View
                    style={[
                      styles.titleItem,
                      item === selectedPreset ? styles.active : null,
                    ]}>
                    <Text
                      style={[
                        item === selectedPreset
                          ? {color: '#fff'}
                          : {color: '#69737B'},
                      ]}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    paddingHorizontal: 10,
    marginTop: 82,
    height: 50,
    backgroundColor: '#16171D',
  },
  selector: {
    height: 40,
    backgroundColor: '#16171D',
    borderStyle: 'solid',
    flexDirection: 'row',
    borderColor: '#183716',
    // overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 30,
  },
  active: {
    borderRadius: 30,
    backgroundColor: '#183716',
  },
  titleItem: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    height: 33,
    marginTop: 2.3,
  },
});

export default TitleList;
