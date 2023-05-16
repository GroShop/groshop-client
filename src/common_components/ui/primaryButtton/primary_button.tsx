import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface IPrimaryButtonProps {
  icon?: any;
  onClick?: any;
  text: any;
  btnStyle?: string;
}

const PrimaryButton = (props: IPrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.7}
      className="w-full h-14 ">
      <View
        className={`flex-row items-center justify-center  bg-primary-green px-3 h-full rounded-lg `}>
        <Text
          className={`text-sm font-merriweather-bold text-btn-white ${props.btnStyle}`}>
          {props.text}
        </Text>
        {/* {props.icon && (
          <View className="">
            <Image
              source={props.icon ? props.icon : Assets.eyeActive}
              className="h-4 w-5 "
            />
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
