import React, {useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HistoryItem from './components/HistoryItem';
import {useHistory} from '../../../store/history/history.selectors';
import {useDispatch} from 'react-redux';
import {getHistoryAction} from '../../../store/history/history.actions';
import {useUserToken} from '../../../store/user/user.selectors';

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useUserToken();

  useEffect(() => {
    if (token) {
      dispatch(getHistoryAction());
    }
  }, []);

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
