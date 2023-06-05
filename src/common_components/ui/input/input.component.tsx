import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Assets from '../../../imports/assets.imports';
import {Controller} from 'react-hook-form';
import ImageComponent from '../image/image.component';

interface IInputProps {
  icon?: any;
  placeholder?: string;
  iconOnPress?: any;
  name: any;
  rules?: any;
  control: any;
  style?: string;
  inputStyle?: string;
  type?: any;
  placeholderColor?: string;
  inputWrapperStyle?: string;
  securityPassword?: boolean;
  onClick?: any;
  keyboardType?:any
}

const Input = (props: IInputProps) => {
  return (
    <View className={`w-full ${props.style}`}>
      <Controller
        name={props.name}
        rules={props.rules || {}}
        control={props.control}
        render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
          return (
            <>
              <View
                className={`flex-row items-center justify-between rounded-lg ${props.inputWrapperStyle} ${
                  error && 'border-error border-[1px]'
                }`}>
                <TextInput
                  className={`${
                    props.inputStyle
                  } text-secondary-black font-merriweather-regular h-full text-[14px] ${
                    props.iconOnPress || props.icon ? 'w-[80%]' : 'w-full'
                  } rounded-lg`}
                  placeholder={props.placeholder}
                  placeholderTextColor={
                    props.placeholderColor ? props.placeholderColor : '#ACADAC'
                  }
                  inputMode={props.type}
                  autoCapitalize="none"
                  secureTextEntry={props.securityPassword}
                  onChangeText={onChange}
                  value={value}
                  keyboardType={props.keyboardType}
                />
                {props.icon && (
                  <View>
                    <ImageComponent src={props.icon} height={20} width={22} svg/>
                  </View>
                )}
                {props.iconOnPress && (
                  <TouchableOpacity activeOpacity={0.7} onPress={props.onClick}>
                    <ImageComponent
                      svg
                      src={props.iconOnPress}
                      height={20}
                      width={22}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {error && (
                <Text className="text-error text-[12px] px-1 pt-1">
                  {error.message}
                </Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default Input;
