import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Assets, ImageComponent} from 'utils/imports.utils';
import {useSetState} from 'utils/functions.utils';

interface IAddressProps {
  index?: number;
  data: any;
  defaultAddress: any;
  editAddress?: any;
}
const AddressComponent = (props: IAddressProps) => {
  const [state, setState] = useSetState({
    active: props.data?.default_address === true ? props.index : null,
  });

  const defaultAddress = (index: any) => {
    return state.active === index;
  };

  useEffect(() => {
    setState({active: props.data?.default_address ? props.index : null});
  }, [props.data?.default_address]);
  return (
    <>
      <TouchableOpacity
        className={`bg-btn-white max-h-[180px] my-2 mx-5 rounded-lg ${
          defaultAddress(props.index)
            ? 'border-primary-green'
            : 'border-input-bg'
        } border-2 pb-2 `}
        key={props.index}
        onPress={() => {
          props.defaultAddress(props.index);
        }}>
        {defaultAddress(props.index) && (
          <View className="flex-row justify-between items-center">
            {
              <View className="bg-primary-green w-[100px] py-2 items-center  rounded-br-lg">
                <Text className="font-merriweather-regular text-[12px]  text-btn-white">
                  Main Address
                </Text>
              </View>
            }
          </View>
        )}
        <View className="w-[95%] mx-auto">
          <View className="flex-row space-x-2  items-center  mt-3 ">
            <View className="h-[40px] w-[40px] rounded-full bg-neutral-white justify-center items-center ">
              <ImageComponent
                src={
                  props.data?.place === 'Office'
                    ? Assets.officeIcon
                    : Assets.homeOutline
                }
                height={24}
                width={24}
                svg
              />
            </View>
            <View>
              <Text className="font-merriweather-bold text-[14px]  text-secondary-black">
                {props.data?.place}
              </Text>
            </View>
          </View>
          <View className="mt-2">
            <View className="space-y-0.5">
              <View className="flex-row space-x-1">
                <Text className="font-merriweather-bold text-[12px]  text-secondary-black">
                  {props.data?.name}
                </Text>
                <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
                  {props.data?.phone_number}
                </Text>
              </View>
              <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
                {props.data?.address}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {defaultAddress(props.index) && (
        <TouchableOpacity
          className="flex-row items-center gap-1 justify-end pt-1  mx-5"
          activeOpacity={0.7}
          onPress={() => props.editAddress(props.data)}>
          <ImageComponent src={Assets.editIcon} height={16} width={16} svg />
          <Text className="font-merriweather-regular text-[12px]  text-primary-green">
            Edit Address
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default AddressComponent;
