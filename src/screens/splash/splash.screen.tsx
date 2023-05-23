import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Assets, Container, ImageComponent} from '../../utils/imports.utils';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(async () => {
      let token: any = await AsyncStorage.getItem('token');
      if (!_.isEmpty(token)) {
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
          <ImageComponent src={Assets.logo} svg height={80} width={80}/>
        </View>
        <Text className="m-5 font-raleway-semi-bold font-bold text-3xl">
          Groshop
        </Text>
      </View>
    </Container>
  );
};

export default Splash;
