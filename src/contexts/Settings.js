import React, {createContext, useMemo, useState} from 'react';

const SettingsContext = createContext({
  customerName: '',
  organizationId: '',
  deploymentId: '',
  videoengagerUrl: '',
  tenantId: '',
  environment: '',
  queue: '',
  avatarImageUrl: '',
  informationLabelText: '',
  backgroundImageURL: '',
  toolbarHideTimeout: '',
  customerLabel: '',
  agentWaitingTimeout: '',
  showAgentBusyDialog: false,
  allowVisitorSwitchAudioToVideo: true,
  callWithPictureInPicture: true,
  callWithSpeakerPhone: true,
  hideAvatar: true,
  hideName: true,
  setCustomerName: () => {},
  setOrganizationId: () => {},
  setDeploymentId: () => {},
  setVideoengagerUrl: () => {},
  setTenantId: () => {},
  setEnvironment: () => {},
  setAvatarImageUrl: () => {},
  setInformationLabelText: () => {},
  setBackgroundImageURL: () => {},
  setToolbarHideTimeout: () => {},
  setCustomerLabel: () => {},
  setAgentWaitingTimeout: () => {},
  setShowAgentBusyDialog: () => {},
  setAllowVisitorSwitchAudioToVideo: () => {},
  setCallWithPictureInPicture: () => {},
  setCallWithSpeakerPhone: () => {},
  setHideAvatar: () => {},
  setHideName: () => {},
  setQueue: () => {},
});

export const SettingsProvider = ({...rest}) => {
  const [customerName, setCustomerName] = useState('Android Demo Tester');
  const [organizationId, setOrganizationId] = useState(
    'c4b553c3-ee42-4846-aeb1-f0da3d85058e',
  );
  const [deploymentId, setDeploymentId] = useState(
    '973f8326-c601-40c6-82ce-b87e6dafef1c',
  );
  const [videoengagerUrl, setVideoengagerUrl] = useState(
    'https://videome.videoengager.com',
  );
  const [tenantId, setTenantId] = useState('0FphTk091nt7G1W7');
  const [environment, setEnvironment] = useState('https://api.mypurecloud.com');
  const [queue, setQueue] = useState('Support');
  const [avatarImageUrl, setAvatarImageUrl] = useState('');
  const [informationLabelText, setInformationLabelText] = useState('');
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [toolbarHideTimeout, setToolbarHideTimeout] = useState('10');
  const [customerLabel, setCustomerLabel] = useState('');
  const [agentWaitingTimeout, setAgentWaitingTimeout] = useState('120');
  const [showAgentBusyDialog, setShowAgentBusyDialog] = useState(false);
  const [allowVisitorSwitchAudioToVideo, setAllowVisitorSwitchAudioToVideo] =
    useState(true);
  const [callWithPictureInPicture, setCallWithPictureInPicture] =
    useState(true);
  const [callWithSpeakerPhone, setCallWithSpeakerPhone] = useState(true);
  const [hideAvatar, setHideAvatar] = useState(true);
  const [hideName, setHideName] = useState(true);

  const value = useMemo(
    () => ({
      customerName,
      organizationId,
      deploymentId,
      videoengagerUrl,
      tenantId,
      environment,
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
      queue,
      setCustomerName,
      setOrganizationId,
      setDeploymentId,
      setVideoengagerUrl,
      setTenantId,
      setEnvironment,
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
      setQueue,
    }),
    [
      customerName,
      organizationId,
      deploymentId,
      videoengagerUrl,
      tenantId,
      environment,
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
      queue,
    ],
  );

  return <SettingsContext.Provider value={value} {...rest} />;
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);

  return context;
};
