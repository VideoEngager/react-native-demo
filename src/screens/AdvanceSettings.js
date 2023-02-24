import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Switch, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Label} from '../components/Label';
import {TextInput} from '../components/TextInput';
import {useSettings} from '../contexts/Settings';
import ResetIcon from '../icons/ResetIcon';

export const AdvanceSettings = () => {
  const navigation = useNavigation();
  const {settings, updateSettings, resetSettings} = useSettings();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Advance Settings'}
        onPressLeft={navigation.goBack}
        rightIcon={<ResetIcon />}
        onPressRight={() => resetSettings()}
      />

      <ScrollView style={styles.wrapper}>
        <TextInput
          label={'Avatar Image Url'}
          placeholder={'Avatar Image Url'}
          value={settings.avatarImageUrl}
          onChangeText={text =>
            updateSettings({...settings, avatarImageUrl: text})
          }
        />
        <TextInput
          label={'Information Label Text'}
          placeholder={'Information Label Text'}
          value={settings.informationLabelText}
          onChangeText={text =>
            updateSettings({...settings, informationLabelText: text})
          }
        />
        <TextInput
          label={'Background Image URL'}
          placeholder={'Background Image URL'}
          value={settings.backgroundImageURL}
          onChangeText={text =>
            updateSettings({...settings, backgroundImageURL: text})
          }
        />
        <TextInput
          label={'Toolbar Hide Timeout'}
          placeholder={'ToolBar Hide Timeout'}
          value={settings.toolbarHideTimeout}
          onChangeText={text =>
            updateSettings({...settings, toolbarHideTimeout: text})
          }
        />
        <TextInput
          label={'Customer Label'}
          placeholder={'Customer Label'}
          value={settings.customerLabel}
          onChangeText={text =>
            updateSettings({...settings, customerLabel: text})
          }
        />
        <TextInput
          label={'Agent Waiting Timeout'}
          placeholder={'Agent Waiting Timeout'}
          value={settings.agentWaitingTimeout}
          onChangeText={text =>
            updateSettings({...settings, agentWaitingTimeout: text})
          }
        />
        <View style={styles.option}>
          <Switch
            value={settings.showAgentBusyDialog}
            onValueChange={text =>
              updateSettings({...settings, showAgentBusyDialog: text})
            }
          />
          <Label style={styles.optionLabel}>Show Agent Busy Dialog</Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={settings.allowVisitorSwitchAudioToVideo}
            onValueChange={text =>
              updateSettings({
                ...settings,
                allowVisitorSwitchAudioToVideo: text,
              })
            }
          />
          <Label style={styles.optionLabel}>
            Allow visitor to switch audio call to Video Call
          </Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={settings.callWithPictureInPicture}
            onValueChange={text =>
              updateSettings({...settings, callWithPictureInPicture: text})
            }
          />
          <Label style={styles.optionLabel}>
            Start Call With Picture In Picture Mode
          </Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={settings.callWithSpeakerPhone}
            onValueChange={text =>
              updateSettings({...settings, callWithSpeakerPhone: text})
            }
          />
          <Label style={styles.optionLabel}>
            Start Call With Speaker Phone
          </Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={settings.hideAvatar}
            onValueChange={text =>
              updateSettings({...settings, hideAvatar: text})
            }
          />
          <Label style={styles.optionLabel}>Hide Avatar</Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={settings.hideName}
            onValueChange={text =>
              updateSettings({...settings, hideName: text})
            }
          />
          <Label style={styles.optionLabel}>Hide Name</Label>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    display: 'flex',
    flex: 1,
    height: '100%',
    paddingHorizontal: 22,
  },

  button: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    height: 44,
  },

  option: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },

  optionLabel: {marginLeft: 10},

  text: {
    color: '#FFFFFF',
  },
});
