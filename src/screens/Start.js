import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  NativeModules,
  Platform,
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
      <Header title={'Choose Option'} />
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={onPressGenesysCloud}>
          <Image
            style={styles.image}
            source={require('../images/genesys_cloud.png')}
            resizeMode="center"
          />
        </TouchableWithoutFeedback>
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
    borderColor: '#ccc',
    marginHorizontal: 22,
    height: 60,
  },

  image: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    width: 292,
  },

  version: {
    display: 'flex',
    alignSelf: 'center',
  },
});
