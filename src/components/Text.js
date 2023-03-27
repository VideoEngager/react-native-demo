import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

export const Text = ({
  children,
  center = false,
  small = false,
  style,
  ...rest
}) => {
  return (
    <RNText
      style={[
        small && textStyles.small,
        center && textStyles.textCenter,
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

export const textStyles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },

  textWrap: {
    flex: 1,
    flexWrap: 'wrap',
  },

  small: {
    fontSize: 14,
    lineHeight: 18,
  },
});
