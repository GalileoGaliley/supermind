import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Chevron from '../../../../assets/images/icons/Chevron';
import {DeleteIcon} from '../../../../assets/images/icons/IconPack';
import {Chat} from '../../../../store/chat/chat.types';
import {useDispatch} from 'react-redux';
import {deleteHistoryAction} from '../../../../store/history/history.actions';
import {deleteHistoryFromList} from '../../../../store/history/history.slice';

type OwnProps = {
  item: Chat;
};
const HistoryItem = ({item}: OwnProps) => {
  const {messages, id, createdAt} = item;
  const date = new Date(createdAt).toLocaleDateString();
  const h = new Date(createdAt).getHours();
  const m = new Date(createdAt).getMinutes();

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(deleteHistoryAction(id));
    dispatch(deleteHistoryFromList({id: id}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.messageItem}>
          <Text style={styles.messageText}>{messages[0].content}</Text>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => console.log('Continue')}>
          <Chevron />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.date}>{`${h >= 10 ? h : '0' + h}:${
            m >= 10 ? m : '0' + m
          }`}</Text>
        </View>
        <TouchableOpacity onPress={deleteItem}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#23232D',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
  },
  date: {
    color: '#69737B',
    marginRight: 14,
  },
  infoContainer: {
    marginTop: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '10%',
  },
  messageContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  messageItem: {
    backgroundColor: '#183716',
    borderRadius: 14,
    padding: 14,
    width: '90%',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
});
export default HistoryItem;
