import {View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

interface ILottie {
  src: any;
  width?: number;
  height?: number;
}
const LottieComponent = (props: ILottie) => {
  return (
    <View className="w-full h-full justify-center items-center">
      <Lottie
        style={{width: props.width || 300, height: props.height || 300}}
        autoPlay
        loop
        source={props.src}
      />
    </View>
  );
};

export default LottieComponent;
