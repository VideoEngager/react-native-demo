import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Switch, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Label} from '../components/Label';
import {TextInput} from '../components/TextInput';

export const AdvanceSettings = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Advance Settings'} onPressLeft={navigation.goBack} />

      <ScrollView style={styles.wrapper}>
        <TextInput
          label={'Avatar Image Url'}
          placeholder={'Avatar Image Url'}
          value={''}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Information Label Text'}
          placeholder={'Information Label Text'}
          value={''}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Background Image URL'}
          placeholder={'Background Image URL'}
          value={''}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Toolbar Hide Timeout'}
          placeholder={'ToolBar Hide Timeout'}
          value={'10'}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Customer Label'}
          placeholder={'Customer Label'}
          value={''}
          onChangeText={() => {}}
        />
        <TextInput
          label={'Agent Waiting Timeout'}
          placeholder={'Agent Waiting Timeout'}
          value={'120'}
          onChangeText={() => {}}
        />
        <View style={styles.option}>
          <Switch value={false} onValueChange={value => {}} disabled={false} />
          <Label style={styles.optionLabel}>Show Agent Busy Dialog</Label>
        </View>
        <View style={styles.option}>
          <Switch value={true} onValueChange={value => {}} disabled={false} />
          <Label style={styles.optionLabel}>
            Allow visitor to switch audio call to Video Call
          </Label>
        </View>
        <View style={styles.option}>
          <Switch value={true} onValueChange={value => {}} disabled={false} />
          <Label style={styles.optionLabel}>
            Start Call With Picture In Picture Mode
          </Label>
        </View>
        <View style={styles.option}>
          <Switch value={true} onValueChange={value => {}} disabled={false} />
          <Label style={styles.optionLabel}>
            Start Call With Speaker Phone
          </Label>
        </View>
        <View style={styles.option}>
          <Switch value={true} onValueChange={value => {}} disabled={false} />
          <Label style={styles.optionLabel}>Hide Avatar</Label>
        </View>
        <View style={styles.option}>
          <Switch value={true} onValueChange={value => {}} disabled={false} />
          <Label style={styles.optionLabel}>Hide Name</Label>
        </View>
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
    flex: 1,
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
    marginBottom: 15,
    height: 44,
  },

  option: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },

  optionLabel: {marginLeft: 10},

  text: {
    color: '#FFFFFF',
  },
});
