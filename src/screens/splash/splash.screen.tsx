import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Assets, Container} from '../../utils/imports.utils';

const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 1000);
  });
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
