import React from 'react';
import { View } from 'react-native';
import { ChatHeader } from 'AppComponentShared';
import Chatting from './chatting';

export const ChatWrapper = (props) => (
  <View style={{ flex: 1 }}>
    <ChatHeader key="100" name={props.name} />
    <Chatting key="101" />
  </View>
);
