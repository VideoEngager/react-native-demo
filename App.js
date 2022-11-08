/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Alert,
  ToastAndroid,
  NativeModules,
  NativeEventEmitter,
  Linking,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//declare VideoEngager Module
const { VeReactModule } = NativeModules;

userName='React Native Tester';

function veShortUrlCall(veShortUrl){
  console.log("Short Url Call : "+veShortUrl)
  VeReactModule.CallWithShortUrl(veShortUrl)
}



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // if app starts from deep link, handle it here
   Linking.getInitialURL().then(veShortUrl => {
    console.log("Initial Url : "+veShortUrl)
    if(veShortUrl!=null && veShortUrl.length>0) {
      veShortUrlCall(veShortUrl)
    }
  })
  // If App is running register for deep links and handle event
  Linking.addEventListener('url', (event)=>{
    console.log("Event Url : "+event.url)
    if(event.url!=null && event.url.length>0) {
      veShortUrlCall(event.url)
     }
  })
  
    //declare event emmiter and add Videoengager events
    const eventEmitter = new NativeEventEmitter(NativeModules.VeReactModule);
    eventEmitter.addListener('Ve_onError', (event) => {
       console.log(event)
    });
    eventEmitter.addListener('Ve_onChatMessage', (event) => {
      console.log(event)

      Alert.alert(
        "Chat Message",
        event,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
   });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Fill your Name:" >
            <View>
             <TextInput style = {styles.input} onChangeText={(text) => this.userName = text} defaultValue = {this.userName} />
             </View>
          </Section>
          <Section title="ClickToVideo" >
            <Button title='  ..:: ClickMe ::..  ' onPress={() => VeReactModule.ClickToVideo(this.userName)}/>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',

  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 200,
    color: Colors.black,
    backgroundColor: `#dcdcdc`,
    width: '100%',
  },
});

export default App;
