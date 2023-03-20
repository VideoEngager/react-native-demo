import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, NativeModules, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Label} from '../components/Label';
import {useInteraction} from '../contexts/Interaction';
import {useSettings} from '../contexts/Settings';
import SettingsIcon from '../icons/SettingsIcon';

const {VeReactModule} = NativeModules;

export const GenesysCloudDemo = () => {
  const navigation = useNavigation();
  const {settings} = useSettings();
  const {interactionInProgress} = useInteraction();

  const onPressGenesysCloud = () => {
    if (interactionInProgress) {
      VeReactModule.CloseInteraction(null);
    } else {
      VeReactModule.ClickToVideo(
        JSON.stringify({...settings, customFields: null}),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'GenesysCloud'}
        onPressLeft={navigation.goBack}
        rightIcon={<SettingsIcon size={24} />}
        onPressRight={() => navigation.navigate('Settings')}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={onPressGenesysCloud}>
          <Label>{interactionInProgress ? 'End Call' : 'Start Video'}</Label>
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
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    height: 44,
  },
});
