import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigators/RootNavigator';
import {Alert, Linking, NativeEventEmitter, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialState as initialSettingsState} from './src/contexts/Settings';
import {URL} from 'react-native-url-polyfill';

const {VeReactModule} = NativeModules;

const eventEmitter = new NativeEventEmitter(NativeModules.VeReactModule);

const App = () => {
  const showError = (title, error) => {
    Alert.alert(title, error, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const Base64 = {
    btoa: (input = '') => {
      let str = input;
      let output = '';

      for (
        let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || ((map = '='), i % 1);
        output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
      ) {
        charCode = str.charCodeAt((i += 3 / 4));

        if (charCode > 0xff) {
          throw new Error(
            "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
          );
        }

        block = (block << 8) | charCode;
      }

      return output;
    },

    atob: (input = '') => {
      let str = input.replace(/[=]+$/, '');
      let output = '';

      if (str.length % 4 == 1) {
        throw new Error(
          "'atob' failed: The string to be decoded is not correctly encoded.",
        );
      }
      for (
        let bc = 0, bs = 0, buffer, i = 0;
        (buffer = str.charAt(i++));
        ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
          ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
          : 0
      ) {
        buffer = chars.indexOf(buffer);
      }

      return output;
    },
  };

  const isValidUrl = urlString => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const findByCode = async (veShortUrl, settings) => {
    try {
      const shortCode = veShortUrl.substring(veShortUrl.lastIndexOf('/') + 1);

      return await fetch(
        `https://${settings.videoengagerUrl}/api/shorturls/findByCode/${shortCode}`,
      ).then(response => response.json());
    } catch (ex) {
      console.log('ex: ' + ex);
      return;
    }
  };

  const processIncomingUrl = async veShortUrl => {
    try {
      if (
        ![
          'staging.leadsecure.com',
          'dev.leadsecure.com',
          'videome.leadsecure.com',
        ].includes(new URL(veShortUrl).host)
      ) {
        console.log('Url not supported. exiting...');
        showError('Shorturl Error', 'Url not supported');
        return;
      }
      const asyncData = await AsyncStorage.getItem('GENESYSCLOUD_SETTINGS');
      const settings = !asyncData
        ? initialSettingsState.settings
        : JSON.parse(asyncData);

      const data = await findByCode(veShortUrl, settings);

      if (data?.error) {
        console.log('Error: ', data.error);
        showError('Shorturl Code Error', `Error: ${data.error}`);
        return;
      }

      if (data.url.indexOf('/static/popup.html') > -1) {
        VeReactModule.CallWithShortUrl(JSON.stringify(settings), veShortUrl);
      } else if (isValidUrl(data.url)) {
        const url = new URL(data.url);
        const dParam = url.searchParams.get('d');
        const base64Decoded = Base64.atob(dParam);
        const fields = JSON.parse(base64Decoded).ud || [];
        let customFields = {
          firstName: '',
          lastName: '',
          email: '',
          addressStreet: '',
          addressCity: '',
          addressPostalCode: '',
          addressState: '',
          phoneNumber: '',
          phoneType: '',
          customerId: '',
          customField1: '',
          customField2: '',
          customField3: '',
        };
        fields.map(field => {
          customFields[field.name] = field.value;
        });
        VeReactModule.ClickToVideo(
          JSON.stringify({...settings, customFields: customFields}),
        );
      } else {
        console.log('Url not supported. exiting...');
      }
    } catch (ex) {
      console.log('processIncomingUrl ex: ' + ex);
      showError('processIncomingUrl Error', ex);
      return;
    }
  };

  // if app starts from deep link, handle it here
  Linking.getInitialURL().then(veShortUrl => {
    console.log('Initial Url : ' + veShortUrl);
    if (veShortUrl != null && veShortUrl.length > 0) {
      processIncomingUrl(veShortUrl);
    }
  });
  // If App is running register for deep links and handle event
  Linking.addEventListener('url', event => {
    console.log('Event Url : ' + event.url);
    if (event.url != null && event.url.length > 0) {
      processIncomingUrl(event.url);
    }
  });

  // declare event emmiter and add Videoengager events
  eventEmitter.addListener('Ve_onError', event => {
    console.log('Ve_onError', event);

    Alert.alert('SDK Error', event, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
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
