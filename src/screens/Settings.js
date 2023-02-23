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
import {useSettings} from '../contexts/Settings';

export const Settings = () => {
  const navigation = useNavigation();
  const {
    customerName,
    organizationId,
    deploymentId,
    videoengagerUrl,
    tenantId,
    environment,
    setCustomerName,
    setOrganizationId,
    setDeploymentId,
    setVideoengagerUrl,
    setTenantId,
    setEnvironment,
  } = useSettings();
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Settings'} onPressLeft={navigation.goBack} />

      <ScrollView style={styles.wrapper}>
        <TextInput
          style={styles.btnText}
          label={'Customer Name'}
          placeholder={'Customer Name'}
          value={customerName}
          onChangeText={setCustomerName}
        />
        <TextInput
          style={styles.btnText}
          label={'Organization Id'}
          placeholder={'Organization Id'}
          value={organizationId}
          onChangeText={setOrganizationId}
        />
        <TextInput
          style={styles.btnText}
          label={'Deployment Id'}
          placeholder={'Deployment Id'}
          value={deploymentId}
          onChangeText={setDeploymentId}
        />
        <TextInput
          style={styles.btnText}
          label={'Videoengager Url'}
          placeholder={'Videoengager Url'}
          value={videoengagerUrl}
          onChangeText={setVideoengagerUrl}
        />
        <TextInput
          style={styles.btnText}
          label={'Tenant Id'}
          placeholder={'Tenant Id'}
          value={tenantId}
          onChangeText={setTenantId}
        />
        <TextInput
          style={styles.btnText}
          label={'Environment'}
          placeholder={'Environment'}
          value={environment}
          onChangeText={setEnvironment}
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

  btnText: {
    color: 'black',
    borderWidth: 1,
  },
});
