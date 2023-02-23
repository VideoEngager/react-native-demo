import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Switch, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Label} from '../components/Label';
import {TextInput} from '../components/TextInput';
import {useSettings} from '../contexts/Settings';

export const AdvanceSettings = () => {
  const navigation = useNavigation();
  const {
    avatarImageUrl,
    informationLabelText,
    backgroundImageURL,
    toolbarHideTimeout,
    customerLabel,
    agentWaitingTimeout,
    showAgentBusyDialog,
    allowVisitorSwitchAudioToVideo,
    callWithPictureInPicture,
    callWithSpeakerPhone,
    hideAvatar,
    hideName,
    setAvatarImageUrl,
    setInformationLabelText,
    setBackgroundImageURL,
    setToolbarHideTimeout,
    setCustomerLabel,
    setAgentWaitingTimeout,
    setShowAgentBusyDialog,
    setAllowVisitorSwitchAudioToVideo,
    setCallWithPictureInPicture,
    setCallWithSpeakerPhone,
    setHideAvatar,
    setHideName,
  } = useSettings();
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Advance Settings'} onPressLeft={navigation.goBack} />

      <ScrollView style={styles.wrapper}>
        <TextInput
          label={'Avatar Image Url'}
          placeholder={'Avatar Image Url'}
          value={avatarImageUrl}
          onChangeText={setAvatarImageUrl}
        />
        <TextInput
          label={'Information Label Text'}
          placeholder={'Information Label Text'}
          value={informationLabelText}
          onChangeText={setInformationLabelText}
        />
        <TextInput
          label={'Background Image URL'}
          placeholder={'Background Image URL'}
          value={backgroundImageURL}
          onChangeText={setBackgroundImageURL}
        />
        <TextInput
          label={'Toolbar Hide Timeout'}
          placeholder={'ToolBar Hide Timeout'}
          value={toolbarHideTimeout}
          onChangeText={setToolbarHideTimeout}
        />
        <TextInput
          label={'Customer Label'}
          placeholder={'Customer Label'}
          value={customerLabel}
          onChangeText={setCustomerLabel}
        />
        <TextInput
          label={'Agent Waiting Timeout'}
          placeholder={'Agent Waiting Timeout'}
          value={agentWaitingTimeout}
          onChangeText={setAgentWaitingTimeout}
        />
        <View style={styles.option}>
          <Switch
            value={showAgentBusyDialog}
            onValueChange={setShowAgentBusyDialog}
          />
          <Label style={styles.optionLabel}>Show Agent Busy Dialog</Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={allowVisitorSwitchAudioToVideo}
            onValueChange={setAllowVisitorSwitchAudioToVideo}
          />
          <Label style={styles.optionLabel}>
            Allow visitor to switch audio call to Video Call
          </Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={callWithPictureInPicture}
            onValueChange={setCallWithPictureInPicture}
          />
          <Label style={styles.optionLabel}>
            Start Call With Picture In Picture Mode
          </Label>
        </View>
        <View style={styles.option}>
          <Switch
            value={callWithSpeakerPhone}
            onValueChange={setCallWithSpeakerPhone}
          />
          <Label style={styles.optionLabel}>
            Start Call With Speaker Phone
          </Label>
        </View>
        <View style={styles.option}>
          <Switch value={hideAvatar} onValueChange={setHideAvatar} />
          <Label style={styles.optionLabel}>Hide Avatar</Label>
        </View>
        <View style={styles.option}>
          <Switch value={hideName} onValueChange={setHideName} />
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
