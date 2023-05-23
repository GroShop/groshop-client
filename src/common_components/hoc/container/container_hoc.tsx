import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

interface IContainer {
  loading?: boolean;
  statusBarColor?: string;
  children?: any;
}
const Container = (props: IContainer) => {
  const inset = useSafeAreaInsets();
  return (
    <View>
      <StatusBar
        backgroundColor={'green'}
        translucent={true}
        hidden={false}
        barStyle={'dark-content'}
      />
      {props.loading ? (
        <View></View>
      ) : (
        <View style={{paddingTop: inset.top}} className="h-full w-full bg-light-mode">
          {props.children}
        </View>
      )}
    </View>
  );
};

export default Container;