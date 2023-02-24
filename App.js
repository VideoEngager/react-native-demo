import React from 'react';
import {Alert, NativeModules, NativeEventEmitter, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigators/RootNavigator';

//declare VideoEngager Module
const {VeReactModule} = NativeModules;

function veShortUrlCall(veShortUrl) {
  console.log('Short Url Call : ' + veShortUrl);
  VeReactModule.CallWithShortUrl(veShortUrl);
}

const App = () => {
  // if app starts from deep link, handle it here
  Linking.getInitialURL().then(veShortUrl => {
    console.log('Initial Url : ' + veShortUrl);
    if (veShortUrl != null && veShortUrl.length > 0) {
      veShortUrlCall(veShortUrl);
    }
  });
  // If App is running register for deep links and handle event
  Linking.addEventListener('url', event => {
    console.log('Event Url : ' + event.url);
    if (event.url != null && event.url.length > 0) {
      veShortUrlCall(event.url);
    }
  });

  //declare event emmiter and add Videoengager events
  const eventEmitter = new NativeEventEmitter(NativeModules.VeReactModule);
  eventEmitter.addListener('Ve_onError', event => {
    console.log(event);
  });
  eventEmitter.addListener('Ve_onChatMessage', event => {
    console.log(event);

    Alert.alert('Chat Message', event, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  });

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
