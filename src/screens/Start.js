import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
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
        <TouchableWithoutFeedback onPress={onPressGenesysCloud}>
          <Image
            style={styles.image}
            source={require('../images/genesyscloud.png')}
            resizeMode="center"
          />
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const imageWidth = Dimensions.get('window').width - 22;

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
    display: 'flex',
    justifyContent: 'center',
    height: 80,
    width: imageWidth,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
  },
});
