import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ImageComponent from '../image/image.component';

interface IPrimaryButtonProps {
  icon?: any;
  onClick?: any;
  onPress?: any;
  text: any;
  btnStyle?: string;
  btnText?: string;
  iconHeight?: number;
  iconWidth?: number;
}

const PrimaryButton = (props: IPrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onClick ? props.onClick() : props.onPress}
      activeOpacity={0.7}
      className={`h-14 flex-row items-center justify-center ${
        props.btnStyle ? props.btnStyle : ' bg-primary-green w-full '
      } rounded-lg `}>
      {props.icon && (
        <View className="w-[33%] items-center justify-center">
          <ImageComponent
            src={props.icon}
            height={props.iconHeight}
            width={props.iconWidth}
            svg
          />
        </View>
      )}
      <View className={`${props.icon && 'w-[67%]'}`}>
        <Text
          className={`text-sm  ${
            props.btnText ? props.btnText : ' text-btn-white '
          }  font-merriweather-bold`}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
