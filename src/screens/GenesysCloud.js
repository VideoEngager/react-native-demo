import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, View, NativeModules, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Label} from '../components/Label';
import {useInteraction} from '../contexts/Interaction';
import {useSettings} from '../contexts/Settings';
import SettingsIcon from '../icons/SettingsIcon';
import {debounce} from 'lodash';
import {Spinner} from '../components/Spinner';

const {VeReactModule} = NativeModules;

export const GenesysCloudDemo = () => {
  const navigation = useNavigation();
  const {settings} = useSettings();
  const {showLoader, showCallInProgress} = useInteraction();

  const toggleInteraction = useCallback(() => {
    if (showCallInProgress) {
      VeReactModule.CloseInteraction(null);
    } else {
      VeReactModule.ClickToVideo(
        JSON.stringify({...settings, customFields: null}),
      );
    }
  }, [showCallInProgress, settings]);

  const onPressStartInteraction = debounce(toggleInteraction, 500, {
    leading: true,
    trailing: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      {showLoader && <Spinner />}
      <Header
        title={'Genesys Cloud'}
        onPressLeft={navigation.goBack}
        rightIcon={<SettingsIcon size={24} />}
        onPressRight={() => navigation.navigate('Settings')}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[styles.button, showLoader && styles.buttonDisabled]}
          disabled={showLoader}
          onPress={onPressStartInteraction}>
          <Label style={styles.buttonText}>
            {showCallInProgress ? 'End Call' : 'Start Video'}
          </Label>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 22,
  },

  button: {
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    height: 44,
    backgroundColor: '#5F9FBD',
  },

  buttonDisabled: {
    backgroundColor: '#CCC',
  },

  buttonText: {
    color: '#FFF',
  },
});
