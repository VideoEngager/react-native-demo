import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import {Label} from '../components/Label';
import {TextInput} from '../components/TextInput';

export const Settings = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Settings'} onPressLeft={navigation.goBack} />

      <ScrollView style={styles.wrapper}>
        <TextInput
          label={'Customer Name'}
          placeholder={'Customer Name'}
          value={'Android Demo Tester'}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Organization Id'}
          placeholder={'Organization Id'}
          value={'c4b553c3-ee42-4846-aeb1-f0da3d85058e'}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Deployment Id'}
          placeholder={'Deployment Id'}
          value={'973f8326-c601-40c6-82ce-b87e6dafef1c'}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Videoengager Url'}
          placeholder={'Videoengager Url'}
          value={'https://videome.videoengager.com'}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Tenant Id'}
          placeholder={'Tenant Id'}
          value={'0FphTk091nt7G1W7'}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Environment'}
          placeholder={'Environment'}
          value={'https://api.mypurecloud.com'}
          onChangeText={() => {}}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdvanceSettings')}>
          <Label style={styles.text}>Advance Settings</Label>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    display: 'flex',
    height: '100%',
    paddingHorizontal: 22,
  },

  button: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    height: 44,
  },

  text: {
    color: 'white',
  },
});
