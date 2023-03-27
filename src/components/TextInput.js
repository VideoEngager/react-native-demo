import React from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';
import {Label} from './Label';

export const TextInput = ({label, autoCapitalize = 'sentences', ...rest}) => {
  return (
    <>
      {label && <Label style={styles.label}>{label}</Label>}
      <RNTextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="black"
        {...rest}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    paddingHorizontal: 16,
    marginVertical: 5,
    fontSize: 16,
    fontWeight: '500',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
  },

  label: {
    color: 'black',
  },
});
