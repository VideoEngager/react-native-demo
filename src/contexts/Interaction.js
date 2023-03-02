import React, {createContext, useMemo, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

const initialState = {
  interactionInProgress: false,
};

const InteractionContext = createContext({
  ...initialState,
  setIsInInteraction: () => {},
});

const eventEmitter = new NativeEventEmitter(NativeModules.VeReactModule);
export const InteractionProvider = ({...rest}) => {
  const [interactionInProgress, setIsInInteraction] = useState(
    initialState.interactionInProgress,
  );

  eventEmitter.addListener('Ve_onCallStarted', event => {
    setIsInInteraction(true);
  });
  eventEmitter.addListener('Ve_onCallFinished', event => {
    setIsInInteraction(false);
  });

  const value = useMemo(
    () => ({
      interactionInProgress,
      setIsInInteraction,
    }),
    [interactionInProgress, setIsInInteraction],
  );

  return <InteractionContext.Provider value={value} {...rest} />;
};

export const useInteraction = () => {
  const context = React.useContext(InteractionContext);
  return context;
};
