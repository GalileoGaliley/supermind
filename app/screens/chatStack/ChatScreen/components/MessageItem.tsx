import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type OwnProps = {
  message: string;
  role: 'assistant' | 'user';
};

const MessageItem = ({message, role}: OwnProps) => {
  const rolePos = role === 'assistant' ? 'flex-start' : 'flex-end';
  const roleBg = role === 'assistant' ? '#23232D' : '#183716';

  return (
    <View style={[styles.messageContainer, {justifyContent: rolePos}]}>
      <View style={[styles.messageItem, {backgroundColor: roleBg}]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  messageItem: {
    borderRadius: 10,
    padding: 10,
  },
  text: {
    color: '#fff',
  },
});

export default MessageItem;
