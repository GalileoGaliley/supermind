import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import HistoryItem from './components/HistoryItem';
import {
  useHistory,
  useHistoryLoading,
} from '../../../store/history/history.selectors';
import {useDispatch} from 'react-redux';
import {getHistoryAction} from '../../../store/history/history.actions';
import {useUserToken} from '../../../store/user/user.selectors';
import LoadSpin from '../../../components/splashComponent/LoadSpin';

const {width, height} = Dimensions.get('screen');
const HistoryScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useHistoryLoading();
  const token = useUserToken();

  useEffect(() => {
    if (token) {
      dispatch(getHistoryAction());
    }
  }, []);

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
    <ScrollView style={styles.container}>
      {history
        ? history.map(item => <HistoryItem key={item.id} item={item} />)
        : null}
      <View style={styles.holder} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  holder: {
    height: 82,
  },
  container: {
    position: 'relative',
    backgroundColor: '#16171D',
    paddingTop: 82,
    paddingHorizontal: 15,
  },
});

export default HistoryScreen;
