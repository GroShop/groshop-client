import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Assets from '../../../imports/assets.imports';
import {Controller} from 'react-hook-form';
import ImageComponent from '../image/image.component';

interface ISearchInputProps {
  icon?: any;
  placeholder?: string;
  onPress?: any;
  name: any;
  rules?: any;
  control?: any;
  style?: string;
  inputStyle?: string;
  type?: any;
  placeholderColor?: string;
  securityPassword?: boolean;
  onClick?: any; 
}

const SearchInput = (props: ISearchInputProps) => {
  return (
    <TouchableOpacity className={`w-full ${props.style}`} activeOpacity={0.0} onPress={()=>props.onPress()}>
      <Controller
        name={props.name}
        rules={props.rules || {}}
        control={props.control}
        render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
          return (
            <>
              <View
                className={`flex-row items-center  px-2.5 space-x-2 bg-input-bg h-14 rounded-lg `}>
                <View className='w-[8%]'>
                  <ImageComponent
                    src={Assets.searchIcon}
                    height={24}
                    width={24}
                    svg
                  />
                </View>
                <TextInput
                  className={`${props.inputStyle} text-secondary-black  h-full  rounded-lg w-[92%]`}
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
              </View>
            </>
          );
        }}
      />
    </TouchableOpacity>
  );
};

export default SearchInput;
