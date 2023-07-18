import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// dev
// eslint-disable-next-line no-unused-vars
const devConfig = {
  customerName: 'Dev User',
  organizationId: '327d10eb-0826-42cd-89b1-353ec67d33f8',
  deploymentId: 'c2eaaa5c-d755-4e51-9136-b5ee86b92af3',
  videoengagerUrl: 'dev.videoengager.com',
  tenantId: 'test_tenant',
  environment: 'https://api.mypurecloud.au',
};

// staging
const stagingConfig = {
  customerName: 'Mobile Demo Tester',
  organizationId: '639292ca-14a2-400b-8670-1f545d8aa860',
  deploymentId: '1b4b1124-b51c-4c38-899f-3a90066c76cf',
  videoengagerUrl: 'staging.videoengager.com',
  tenantId: 'oIiTR2XQIkb7p0ub',
  environment: 'https://api.mypurecloud.de',
};

// prod
// eslint-disable-next-line no-unused-vars
const prodConfig = {
  customerName: 'Android Demo Tester',
  organizationId: 'c4b553c3-ee42-4846-aeb1-f0da3d85058e',
  deploymentId: '973f8326-c601-40c6-82ce-b87e6dafef1c',
  videoengagerUrl: 'videome.videoengager.com',
  tenantId: 'hbvvUTaZxCVLikpB',
  environment: 'https://api.mypurecloud.com',
};

export const initialState = {
  settings: {
    ...stagingConfig,
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
    return !data ? initialState.settings : JSON.parse(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (JSON.stringify(settings) === JSON.stringify(initialState.settings)) {
      return;
    }
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
