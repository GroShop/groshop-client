import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  ScrollViewComponent,
} from '../../utils/imports.utils';
import {Failure, Success, useSetState} from '../../utils/functions.utils';
import Models from '../../imports/models.imports';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {voucher} from 'utils/redux.utils';

const Voucher = (props: any) => {
  // state
  const [state, setState] = useSetState({
    voucherData: [],
  });

  const getManyVoucher = async () => {
    try {
      let res: any = await Models.voucher.getManyVoucher({});
      setState({voucherData: res.data});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  useEffect(() => {
    getManyVoucher();
  }, []);
  
  return (
    <Container>
      <ScrollViewComponent>
        <View className="items-center flex-row py-10 px-5">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.goBack()}
            className="">
            <ImageComponent src={Assets.backIcon} height={20} width={22} svg />
          </TouchableOpacity>
          <View className="items-center w-[90%] ">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
              My Voucher
            </Text>
          </View>
        </View>
        <View className="items-center justify-center px-5 space-y-4">
          {!_.isEmpty(state.voucherData) &&
            state.voucherData.map((item: any, index: number) =>
              item.name === 'Discount' ? (
                <TouchableOpacity
                  className="bg-product-gray  w-[100%]  shadow-md flex-row justify-between rounded-lg "
                  key={index}
                  onPress={() => {
                    voucher(item);
                    props.navigation.goBack();
                  }}>
                  <View className="flex-row">
                    <View className="bg-primary-green  w-8 items-center justify-center h-7 rounded-tl-lg rounded-br-[20px]">
                      <Text className="font-merriweather-regular text-[12px] text-neutral-white ">
                        3X
                      </Text>
                    </View>
                    <View className="my-4 flex-col">
                      <Text className="font-merriweather-regular text-sm text-secondary-black ml-4">
                        {item.name}
                      </Text>
                      <View className="flex-row space-x-1 ml-4 mb-3">
                        <Text className="font-raleway-bold text-[28px] text-secondary-black">
                          {item.discount}%
                        </Text>
                        <View className="items-end justify-end">
                          <Text className="font-merriweather-regular text-[12px] text-secondary-black ">
                            Off
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center space-x-2">
                        <ImageComponent
                          src={Assets.timeIcon}
                          height={24}
                          width={24}
                          svg
                        />
                        <Text className="font-merriweather-regular text-[12px] text-secondary-black ">
                          {item.expire_voucher}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="items-center justify-center mt-2">
                    <ImageComponent
                      src={
                        'https://res.cloudinary.com/denokpulg/image/upload/v1687938666/Groshop/Product/Picture_d8wuej.png'
                      }
                      height={110}
                      width={118}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-product-gray  w-[100%]  shadow-md flex-row justify-between rounded-lg"
                  key={index}
                  onPress={() => {
                    voucher(item);
                    props.navigation.goBack();
                  }}>
                  <View className="flex-row">
                    <View className="bg-primary-green  w-8 items-center justify-center h-7 rounded-tl-lg rounded-br-[20px]">
                      <Text className="font-merriweather-regular text-[12px] text-neutral-white ">
                        3X
                      </Text>
                    </View>
                    <View className="my-4 flex-col ">
                      <View className="flex-row space-x-1 m-3">
                        <Text className="font-raleway-bold text-[20px] text-secondary-black">
                          {item.name}
                        </Text>
                      </View>
                      <View className="mt-2">
                        {/* <ImageComponent
                    src={Assets.timeIcon}
                    height={24}
                    width={24}
                    svg
                  /> */}
                        <Text className="font-merriweather-regular text-[12px] text-secondary-black ">
                          First time free shipping
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="items-center justify-center bg-light-green relative">
                    <ImageComponent
                      src={Assets.shippingIcon}
                      height={110}
                      width={118}
                      svg
                    />
                    <Text className="font-raleway-bold text-[13px] top-[38px] right-[48px] text-primary-green absolute">
                      Free
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
            )}
        </View>
      </ScrollViewComponent>
    </Container>
  );
};

export default Voucher;
