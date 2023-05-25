import {View, Text, Animated} from 'react-native';
import React from 'react';
import {Assets, ImageComponent} from 'utils/imports.utils';
import {Ratio, height, width} from 'utils/functions.utils';

const SlideItems = ({data, scroll,dotIndex}: any) => {
  return (
    <View className="flex-row absolute bottom-4 items-center justify-center w-full">
      {data.map((item: any, index: number) => {
        const inputRange=[(index-1)*width,index*width,(index+1)*width]
        const dotWidth=scroll.interpolate({
          inputRange,
          outputRange:[12,30,12],
          extrapolate:'clamp'
        })
        const backgroundColor=scroll.interpolate({
          inputRange,
          outputRange:["#ACADAC","#689C36","#ACADAC"],
          extrapolate:'clamp'
        })
        return (
          <Animated.View
            className="w-[12px] h-[12px] rounded-full bg-text-gray mx-0.5"
            key={index.toString()}  style={[{width:dotWidth,backgroundColor}]}></Animated.View>
        );
      })}
    </View>
  );
};

export default SlideItems;
