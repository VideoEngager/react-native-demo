import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from './Text';

export const Label = ({children, style}) => (
  <Text style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    paddingVertical: 8,
    color: 'black',
  },
});
