import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import ImageComponent from '../image/image.component';

interface IPrimaryInputProps {
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
  isMultiLine?: boolean;
}

const PrimaryInput = (props: IPrimaryInputProps) => {
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
                className={`flex-row items-center justify-between px-2.5 bg-input-bg h-14 rounded-lg ${
                  props.inputWrapperStyle
                } ${error && 'border-error border-[1px]'}`}>
                <TextInput
                multiline={props.isMultiLine?true:false}
                  className={`${
                    props.inputStyle
                  } text-secondary-black font-merriweather-semibold h-full  text-[14px] ${
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
                />
                {props.icon && (
                  <View>
                    <ImageComponent
                      src={props.icon}
                      height={20}
                      width={22}
                      svg
                    />
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

export default PrimaryInput;
