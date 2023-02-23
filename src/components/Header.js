import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

const Header = ({
  title,
  leftIcon = <ArrowLeftIcon size={24} />,
  onPressLeft,
  rightIcon,
  onPressRight,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <View style={styles.left}>
          {onPressLeft ? (
            <TouchableOpacity style={styles.touchable} onPress={onPressLeft}>
              {leftIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.touchable}>
              <View style={styles.placeHolder} />
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text center style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.right}>
          {onPressRight ? (
            <TouchableOpacity style={styles.touchable} onPress={onPressRight}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.touchable}>
              <View style={styles.placeHolder} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },

  left: {
    zIndex: 10,
  },

  content: {
    flex: 1,
  },

  title: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
  },

  right: {
    zIndex: 10,
  },

  touchable: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 4,
    paddingHorizontal: 22,
    paddingVertical: 32,
  },

  placeHolder: {
    width: 24,
  },
});
