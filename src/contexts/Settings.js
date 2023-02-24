import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  settings: {
    customerName: 'Android Demo Tester',
    organizationId: 'c4b553c3-ee42-4846-aeb1-f0da3d85058e',
    deploymentId: '973f8326-c601-40c6-82ce-b87e6dafef1c',
    videoengagerUrl: 'https://videome.videoengager.com',
    tenantId: 'hbvvUTaZxCVLikpB',
    environment: 'https://api.mypurecloud.com',
    queue: 'Support',
    avatarImageUrl: '',
    informationLabelText: '',
    backgroundImageURL: '',
    toolbarHideTimeout: '10',
    customerLabel: '',
    agentWaitingTimeout: '120',
    showAgentBusyDialog: false,
    allowVisitorSwitchAudioToVideo: true,
    callWithPictureInPicture: true,
    callWithSpeakerPhone: true,
    hideAvatar: true,
    hideName: true,
  },
};

const SettingsContext = createContext({
  ...initialState,
  updateSettings: () => {},
  resetSettings: () => {},
});

export const SettingsProvider = ({...rest}) => {
  const [settings, updateSettings] = useState({
    ...initialState.settings,
  });

  const saveSettings = useCallback(async () => {
    await AsyncStorage.setItem(
      'GENESYSCLOUD_SETTINGS',
      JSON.stringify({...settings}),
    );
  }, [settings]);

  const getSettings = useCallback(async () => {
    const data = await AsyncStorage.getItem('GENESYSCLOUD_SETTINGS');
    return data !== undefined ? JSON.parse(data) : {...initialState.settings};
  }, []);

  const updateState = useCallback(async () => {
    const _settings = await getSettings();
    updateSettings({..._settings});
  }, [getSettings]);

  const resetSettings = useCallback(async () => {
    await AsyncStorage.setItem(
      'GENESYSCLOUD_SETTINGS',
      JSON.stringify({...initialState.settings}),
    );
    updateSettings({...initialState.settings});
  }, []);

  useEffect(() => {
    updateState();
  }, [updateState]);

  useEffect(() => {
    saveSettings();
  }, [saveSettings, settings]);

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
      resetSettings,
    }),
    [resetSettings, settings],
  );

  return <SettingsContext.Provider value={value} {...rest} />;
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  return context;
};
