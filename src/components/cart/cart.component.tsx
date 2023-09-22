import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Assets, Container, ImageComponent} from '../../utils/imports.utils';

const CartComponent = (props: any) => {
  return (
    <Container>
      <View className="items-center flex-row justify-center w-[90%] mx-auto h-[10%]">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="">
          <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
        </TouchableOpacity>
        <View className="items-center w-[90%] ">
          <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
            My Cart
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default CartComponent;
