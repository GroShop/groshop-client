import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LottieComponent} from '../../../utils/imports.utils';

interface IContainer {
  loading?: boolean;
  statusBarColor?: string;
  children?: any;
  backgroundColor?: string;
  lottie?: any;
}
const Container = (props: IContainer) => {
  const inset = useSafeAreaInsets();
  return (
    <View>
      <StatusBar
        backgroundColor={
          props.backgroundColor ? props.backgroundColor : 'white'
        }
        translucent={true}
        hidden={false}
        barStyle={'dark-content'}
      />
      {props.loading ? (
        <View className="w-full h-full">
          <LottieComponent src={props.lottie} />
        </View>
      ) : (
        <View
          style={{paddingTop: inset.top}}
          className="h-full w-full bg-light-mode">
          {props.children}
        </View>
      )}
    </View>
  );
};

export default Container;
