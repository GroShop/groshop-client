import { View, Text } from 'react-native'
import React from 'react'
import { Assets, Container, ImageComponent } from '../../utils/imports.utils'

interface ICheckoutCart{
  data:any
}



const CheckoutCart = (props:ICheckoutCart) => {
  const { cart_product } = props.data
  return (
    <View className="flex-row  items-center space-x-3 mx-2 h-[100px] bg-neutral-white rounded-lg px-3">
    <View className="">
      <ImageComponent
        src={cart_product.product_pic}
        height={80}
        width={80}
      />
    </View>
    <View>
      <Text className="font-merriweather-bold text-secondary-black  text-base ">
        {cart_product.name}
      </Text>
      <Text className="font-merriweather-regular text-secondary-black text-sm">
       {props.data.weight} kg
      </Text>
      <Text className="font-merriweather-bold text-secondary-black text-base ">
        ${cart_product.price*props.data.weight}
      </Text>
    </View>
  </View>
  )
}

export default CheckoutCart