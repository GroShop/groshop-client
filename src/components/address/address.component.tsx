import {View, Text} from 'react-native';
import React from 'react';

const CheckoutCart = () => {
  return (
    <View className="space-y-0.5">
      <View className="flex-row space-x-1">
        <Text className="font-merriweather-bold text-[12px]  text-secondary-black">
          Myoui Sharon
        </Text>
        <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
          (302) 555-0107
        </Text>
      </View>
      <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
        101 Canal St, Boston, MA 02114, United States
      </Text>
    </View>
  );
};

export default CheckoutCart;
