import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useInteraction} from '../contexts/Interaction';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import {Label} from './Label';

const Header = ({
  title,
  leftIcon = <ArrowLeftIcon size={24} />,
  onPressLeft,
  rightIcon,
  onPressRight,
}) => {
  const {interactionInProgress} = useInteraction();
  return (
    <View style={styles.container}>
      <StatusBar />
      {interactionInProgress && (
        <View style={styles.callStatus}>
          <Label style={styles.callText}>CALL IN PROGRESS...</Label>
        </View>
      )}
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
              <View style={styles.iconRight}>{rightIcon}</View>
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
    marginVertical: 20,
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
    paddingHorizontal: 22,
  },

  placeHolder: {
    width: 24,
  },

  iconRight: {
    marginBottom: 10,
  },

  callStatus: {
    height: 30,
    backgroundColor: '#1fe053',
    display: 'flex',
    alignItems: 'center',
  },

  callText: {
    color: '#000000',
    fontSize: 10,
    justifyContent: 'center',
  },
});
