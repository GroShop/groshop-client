import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Assets, ImageComponent, RatingComponent} from '../../utils/imports.utils';

const ProductCard = (props:any) => {
  return (
    <TouchableOpacity className="rounded-lg border-text-gray w-[156px] h-[176px] border-2  relative" onPress={()=>props.navigation.navigate("ProductScreen")}>
      <View className="bg-primary-green w-[37px] rounded-tl-lg  rounded-br-lg h-[24px] items-center justify-center ">
        <Text className="font-merriweather-regular  text-neutral-white  ">
          10%
        </Text>
      </View>
      <View className="items-center justify-center bottom-3 ml-2 ">
        <ImageComponent src={Assets.productIcon} svg height={80} />
      </View>
      <View className="bottom-2">
        <Text className="font-merriweather-bold text-secondary-black ml-2 text-base ">
          Orange
        </Text>
        <View className="mx-2 flex-row justify-between items-end ">
          <View className="">
            <Text className="font-merriweather-regular text-text-gray text-sm">
              1 kg
            </Text>
            <View className="flex-row space-x-1 items-center pb-1">
              <Text className="font-merriweather-regular text-text-gray text-sm line-through">
                $7.50
              </Text>
              <Text className="font-merriweather-bold text-primary-green text-base ">
                $7.50
              </Text>
            </View>
          </View>
          <View className="items-center justify-center  bg-primary-green  h-[36px] w-[36px]  rounded-full">
            <ImageComponent src={Assets.buyCart} svg height={24} width={24} />
          </View>
         
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
