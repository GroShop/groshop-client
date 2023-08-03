import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

interface ITextAreaProps {
  placeholder?: string;
  name: any;
  rules?: any;
  control: any;
  style?: string;
  inputStyle?: string;
  type?: any;
  placeholderColor?: string;
  inputWrapperStyle?: string;
  onClick?: any;
  textAreaSize?: number;
}

const TextArea = (props: ITextAreaProps) => {
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
                className={`flex-row items-start justify-start p-2.5 bg-input-bg h-[100px] rounded-lg ${props.inputWrapperStyle} ${
                  error && 'border-error border-[1px]'
                }`}>
                <TextInput
                 editable
                 multiline
                  className={`${
                    props.inputStyle
                  } text-secondary-black  h-full w-full rounded-lg`}
                  placeholder={props.placeholder}
                  placeholderTextColor={
                    props.placeholderColor ? props.placeholderColor : '#ACADAC'
                  }
                  inputMode={props.type}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
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

export default TextArea;
