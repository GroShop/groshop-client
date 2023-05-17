import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Assets, Container} from '../../utils/imports.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(async () => {
      let localStorage: any = await AsyncStorage.getItem('getStarted');
      localStorage = JSON.parse(localStorage);
      if (localStorage) {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    }, 2000);
  }, []);
  return (
    <Container>
      <View className="items-center justify-center h-full">
        <View className="rounded-full bg-primary-green w-32 h-32 items-center justify-center">
          <Image source={Assets.logo} />
        </View>
        <Text className="m-5 font-raleway-semi-bold font-bold text-3xl">
          Groshop
        </Text>
      </View>
    </Container>
  );
};

export default Splash;
