import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

export const Spinner = ({
  size = 'large',
  containerViewStyle,
  lottieStyle,
  color,
  ...rest
}) => {
  return (
    <>
      <View style={styles.container} pointerEvents="none">
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={size} color={'#000'} {...rest} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  spinnerContainer: {
    paddingVertical: 18,
    alignSelf: 'center',
  },
  spinnerSize: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
