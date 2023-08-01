import {View, Text} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSetState} from 'utils/functions.utils';
import {Colors} from 'utils/theme.utils';
import {Controller} from 'react-hook-form';


interface IDropdownProps {
  name: string;
  rules?: any;
  control: any;
  style?: string;
  inputStyle?: string;
  inputWrapperStyle?: string;
  onClick?: any;
  data?: any;
  placeholder?: string;
}
const DropDown = forwardRef((props: IDropdownProps, ref) => {
  const [state, setState] = useSetState({
    isModalOpen: false,
    value: {},
  });

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
               >
                <DropDownPicker
                className={`flex-row items-center justify-between  p-2.5 bg-input-bg h-14 rounded-lg ${
                  props.inputWrapperStyle
                } ${error && 'border-error border-[1px]'}`}
                  placeholder={props.placeholder ||''}
                  placeholderStyle={{
                    color: Colors['text-gray'],
                  }}
                  open={state.isModalOpen}
                  zIndexInverse={2000}
                  containerStyle={{}}
                  style={{
                    borderColor: Colors['input-bg'],
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: Colors['input-bg'],
                    borderColor: Colors['primary-green'],
                  }}
                  value={value}
                  items={props.data}
                  setOpen={(open: any) => {
                    setState({isModalOpen: open});
                  }}
                  setValue={(value: any) => {
                    onChange(value());
                    setState({value: value()});
                  }}
                  // setItems={(item:any)=>{
                  //   setState({item: item()});
                  // }
                 
                  // }
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
});

export default DropDown;
