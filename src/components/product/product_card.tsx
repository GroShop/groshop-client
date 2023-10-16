import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {Assets, ImageComponent} from '../../utils/imports.utils';
import _ from 'lodash';

interface IProductCard {
  data?: any;
  navigation: any;
  type?: string;
  onPress?: any;
}

const ProductCard = (props: IProductCard) => {
  return (
    !_.isEmpty(props.data) &&
    props.data.map((item: any, index: number) => (
      <TouchableOpacity
        activeOpacity={0.2}
        className="rounded-lg  w-[156px] h-[176px]  shadow-md  relative my-2 bg-product-gray"
        style={Platform.OS === 'android' ? css.shadow : null}
        key={index}
        onPress={() => {
          props.type === 'filterSearch'
            ? props.onPress(item._id, item.name)
            : props.navigation.navigate(`ProductScreen`, {
                product_id: item._id,
              });
        }}>
        <View className="bg-primary-green w-[37px] rounded-tl-lg  rounded-br-lg h-[24px] items-center justify-center ">
          <Text className="font-merriweather-regular  text-neutral-white  ">
            {item.discount}%
          </Text>
        </View>
        <View className="items-center justify-center bottom-3 ml-2 ">
          <ImageComponent
            src={item.product_pic}
            resize="contain"
radius={100}
            width={156}
            height={80}
          />
        </View>
        <View className="bottom-2">
          <Text className="font-merriweather-bold text-secondary-black ml-2 text-base ">
            {item.name}
          </Text>
          <View className="mx-2 flex-row justify-between items-end ">
            <View className="">
              <Text className="font-merriweather-regular text-text-gray text-sm">
                1 kg
              </Text>
              <View className="flex-row space-x-1 items-center pb-1">
                <Text className="font-merriweather-regular text-text-gray text-sm line-through">
                  ₹{item.price}
                </Text>
                <Text className="font-merriweather-bold text-primary-green text-base ">
                  ₹{item.price - (item.price * item.discount) / 100}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              className="items-center justify-center  bg-primary-green  h-[36px] w-[36px]  rounded-full"
              onPress={() => {
                props.type === 'filterSearch'
                  ? props.onPress(item._id, item.name)
                  : props.navigation.navigate(`ProductScreen`, {
                      product_id: item._id,
                    });
              }}>
              <ImageComponent src={Assets.buyCart} svg height={24} width={24} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ))
  );
};

const css = StyleSheet.create({
  shadow: {
    shadowColor: '#191A19',
    shadowOpacity: 1,
    elevation: 3,
  },
});

export default ProductCard;
