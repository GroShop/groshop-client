import {View, FlatList, Animated} from 'react-native';
import React, {useRef} from 'react';
import {ImageComponent} from '../../utils/imports.utils';
import {height, useSetState, width} from '../../utils/functions.utils';
import {ExpandingDot} from 'react-native-animated-pagination-dots';

interface IImageslider {
  data?: any;
}

const ItemSliderComponent = (props: IImageslider) => {
  // ref
  const flatListRef: any = useRef(null);

  // state
  const [state, setState] = useSetState({
    currentIndex: '',
  });

  const renderItem = (data: any) => {
    return (
      <View className="justify-center items-center">
        <ImageComponent
          resize="contain"
          width={width * 0.9}
          height={(width * height) / width}
          src={data.item}
        />
      </View>
    );
  };
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const Separator = () => {
    return <View className="ml-8"></View>;
  };

  return props.data ? (
    <View className="w-full h-full ">
      <FlatList
        ref={flatListRef}
        style={{width: '100%'}}
        horizontal
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={'normal'}
        data={props.data}
        ItemSeparatorComponent={Separator}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={renderItem}
      />
      <View className="">
        <ExpandingDot
          data={props.data}
          expandingDotWidth={15}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          activeDotColor="#689C36"
          dotStyle={{
            width: 6,
            height: 6,
            backgroundColor: '#ACADAC',
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          containerStyle={{
            top: 4,
          }}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

export default ItemSliderComponent;
