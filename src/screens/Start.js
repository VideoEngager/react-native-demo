import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';

export const StartScreen = () => {
  const navigation = useNavigation();

  const onPressGenesysCloud = () => {
    navigation.navigate('GenesysCloudDemo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Choose Option'} />
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.btnOption}
          onPress={onPressGenesysCloud}
          title="Genesys Cloud">
          <Image
            style={styles.image}
            source={require('../images/genesys_cloud.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },

  image: {
    justifyContent: 'center',
    width: '40%',
    aspectRatio: 16 / 9,
  },

  btnOption: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
