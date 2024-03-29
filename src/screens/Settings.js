import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity,NativeModules, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../components/Header';
import {Label} from '../components/Label';
import {TextInput} from '../components/TextInput';
import {useSettings} from '../contexts/Settings';
import ResetIcon from '../icons/ResetIcon';

const {VeReactModule} = NativeModules;

export const Settings = () => {
  const navigation = useNavigation();
  const {settings, updateSettings, resetSettings} = useSettings();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Settings'}
        onPressLeft={navigation.goBack}
        rightIcon={<ResetIcon />}
        onPressRight={() => resetSettings()}
      />

      <KeyboardAwareScrollView style={styles.wrapper}>
        <TextInput
          style={styles.btnText}
          label={'Customer Name'}
          placeholder={'Customer Name'}
          value={settings.customerName}
          onChangeText={text =>
            updateSettings({...settings, customerName: text})
          }
        />
        <TextInput
          style={styles.btnText}
          label={'Organization Id'}
          placeholder={'Organization Id'}
          value={settings.organizationId}
          onChangeText={text =>
            updateSettings({...settings, organizationId: text})
          }
        />
        <TextInput
          style={styles.btnText}
          label={'Deployment Id'}
          placeholder={'Deployment Id'}
          value={settings.deploymentId}
          onChangeText={text =>
            updateSettings({...settings, deploymentId: text})
          }
        />
        <TextInput
          style={styles.btnText}
          label={'Videoengager Url'}
          placeholder={'Videoengager Url'}
          value={settings.videoengagerUrl}
          onChangeText={text =>
            updateSettings({...settings, videoengagerUrl: text})
          }
        />
        <TextInput
          style={styles.btnText}
          label={'Tenant Id'}
          placeholder={'Tenant Id'}
          value={settings.tenantId}
          onChangeText={text => updateSettings({...settings, tenantId: text})}
        />
        <TextInput
          style={styles.btnText}
          label={'Environment'}
          placeholder={'Environment'}
          value={settings.environment}
          onChangeText={text =>
            updateSettings({...settings, environment: text})
          }
        />
        <TextInput
          style={[styles.btnText, {marginBottom: 10}]}
          label={'Queue'}
          placeholder={'Queue'}
          value={settings.queue}
          onChangeText={text => updateSettings({...settings, queue: text})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdvanceSettings')}>
          <Label style={styles.text}>Advanced Settings</Label>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonRed]}
          onPress={() => {
            console.log('Report a Problem Clicked!')
            VeReactModule.ReportProblem()
          }}>
          <Label style={styles.text}>Report a Problem</Label>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    display: 'flex',
    height: '100%',
    paddingHorizontal: 22,
  },

  button: {
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    height: 44,
    backgroundColor: '#5F9FBD',
  },

  buttonRed: {
    backgroundColor: '#D2042D',
  },

  text: {
    color: 'white',
  },

  btnText: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 10,
  },
});
