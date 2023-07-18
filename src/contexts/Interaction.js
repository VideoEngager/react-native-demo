import React, {createContext, useMemo, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

const initialState = {
  showLoader: false,
  showCallInProgress: false,
};

const InteractionContext = createContext({
  ...initialState,
  setShowLoader: () => {},
  setCallInprogress: () => {},
});

const eventEmitter = new NativeEventEmitter(NativeModules.VeReactModule);
export const InteractionProvider = ({...rest}) => {
  const [showLoader, setShowLoader] = useState(
    initialState.interactionInProgress,
  );
  const [showCallInProgress, setCallInprogress] = useState(
    initialState.callInProgress,
  );

  eventEmitter.addListener('Ve_onCallStarted', event => {
    setShowLoader(false);
    setCallInprogress(true);
  });

  eventEmitter.addListener('Ve_interactionStarted', _ => {
    setShowLoader(true);
  });

  eventEmitter.addListener('Ve_onCallFinished', _ => {
    setShowLoader(false);
    setCallInprogress(false);
  });

  eventEmitter.addListener('Ve_onCallHold', _ => {});

  eventEmitter.addListener('Ve_interactionEstablished', _ => {});

  eventEmitter.addListener('Ve_onCallWaiting', _ => {});

  eventEmitter.addListener('Ve_onCallHanguped', event => {
    setShowLoader(false);
    setCallInprogress(false);
  });

  const value = useMemo(
    () => ({
      showLoader,
      showCallInProgress,
      setShowLoader,
      setCallInprogress,
    }),
    [showCallInProgress, showLoader],
  );

  return <InteractionContext.Provider value={value} {...rest} />;
};

export const useInteraction = () => {
  const context = React.useContext(InteractionContext);
  return context;
};
