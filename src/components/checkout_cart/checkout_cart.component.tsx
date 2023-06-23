import { View, Text } from 'react-native'
import React from 'react'
import { Assets, Container, ImageComponent } from '../../utils/imports.utils'

const CheckoutCart = () => {
  return (
    <View className="flex-row  items-center space-x-3 mx-2 h-[100px] bg-neutral-white rounded-lg px-3">
    <View className="">
      <ImageComponent
        src={Assets.productIcon}
        height={80}
        width={80}
      />
    </View>
    <View>
      <Text className="font-merriweather-bold text-secondary-black  text-base ">
        Orange
      </Text>
      <Text className="font-merriweather-regular text-secondary-black text-sm">
        1 kg
      </Text>
      <Text className="font-merriweather-bold text-secondary-black text-base ">
        $7.50
      </Text>
    </View>
  </View>
  )
}

export default CheckoutCart