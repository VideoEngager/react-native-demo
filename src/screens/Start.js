import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  NativeModules,
  Platform,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Label} from '../components/Label';

const {VeReactModule} = NativeModules;

export const StartScreen = () => {
  const [version, setVersion] = useState('');
  const navigation = useNavigation();

  const onPressGenesysCloud = () => {
    navigation.navigate('GenesysCloudDemo');
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      VeReactModule.GetVeVersion(v => {
        setVersion(v);
      });
    } else {
      setVersion(VeReactModule.GetVeVersion());
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.wrapper}>
        <Pressable onPress={onPressGenesysCloud}>
          <Image
            style={styles.image}
            source={require('../images/genesys_cloud.png')}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <Label style={styles.version}>{`SDK version: ${version}`}</Label>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#5F9FBD',
    marginHorizontal: 22,
    height: 60,
    marginBottom: 40,
  },

  image: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    width: 192,
  },

  version: {
    display: 'flex',
    alignSelf: 'center',
  },
});
