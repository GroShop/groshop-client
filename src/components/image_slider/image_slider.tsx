import {View, Text, FlatList, Animated} from 'react-native';
import React, {useRef} from 'react';
import {Assets, Container, ImageComponent} from '../../utils/imports.utils';
import {useSetState, width} from '../../utils/functions.utils';

const ImageSlider = (props: any) => {
  const slideRef = useRef(new Animated.Value(0)).current;
  const [state, setState] = useSetState({
    dotIndex: 0,
  });
  let slides = [
       Assets.promotions,
       Assets.promotions,
       Assets.promotions,
  ];

  const handleScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: slideRef,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleViewableItemsChanged = useRef(({viewableItems}: any) => {
    // setState({dotIndex: viewableItems[0].index});
  }).current;

  const handleviewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
      <View className="h-[180px] w-full">
        <FlatList
          data={slides}
          renderItem={(item: any) => (
            <View style={{width: width-40, height: 150 }}>
                <ImageComponent
                  src={Assets.promotions}
                  height={150}
                  svg
                />
            </View>
          )}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={handleviewabilityConfig}
          onScroll={handleScroll}
          autom
        />
        <View className="flex-row  items-center justify-center">
          {slides.map((item: any, index: number) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotWidth = slideRef.interpolate({
              inputRange,
              outputRange: [12, 30, 12],
              extrapolate: 'clamp',
            });
            const backgroundColor = slideRef.interpolate({
              inputRange,
              outputRange: ['#ACADAC', '#689C36', '#ACADAC'],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                className="w-[12px] h-[12px] rounded-full bg-text-gray mx-0.5"
                key={index.toString()}
                style={[{width: dotWidth, backgroundColor}]}></Animated.View>
            );
          })}
        </View>
      </View>
  );
};

export default ImageSlider;
