import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Assets, Container, ImageComponent} from 'utils/imports.utils';

const TrackOrder = (props: any) => {

  // const orderFilter
  return (
    <Container>
      <View className="mx-[20px]">
        <View className="items-center flex-row justify-center my-5">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.goBack()}
            className="">
            <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
          </TouchableOpacity>
          <View className="items-center w-[90%] ">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[15px]">
              My Orders
            </Text>
          </View>
        </View>
        <View className="w-full items-center justify-center p-5 ">
          {/* <FilterSlider onPress={(value: any) => setState({tags: value})} data={productFilter} active="All" /> */}
        </View>
      </View>
    </Container>
  );
};

export default TrackOrder;
