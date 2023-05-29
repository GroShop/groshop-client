import {View, Text, FlatList, Animated} from 'react-native';
import React, {useRef} from 'react';
import {Assets, Container, ImageComponent} from 'utils/imports.utils';
import {useSetState, width} from 'utils/functions.utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FilterSlider = (props: any) => {
  const slideRef = useRef(new Animated.Value(0)).current;
  const [state, setState] = useSetState({
    dotIndex: 0,
    active:"All"
  });
  let slides = [
      "All","Flash Sale","Discount","Best offer","Buy Again","New"
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

  const handleSlider=(data:any)=>{
setState({active: data.item})
  }

  const handleviewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
      <View className="w-full">
        <FlatList
          data={slides}
          renderItem={(item: any,index:number) => (
            <TouchableOpacity className={`mr-4  ${item.item===state.active&&'border-b-2 border-primary-green '}pb-1`} onPress={()=>handleSlider(item)} activeOpacity={0.7}>
               <Text className={` text-[12px] ${item.item===state.active? 'text-primary-green font-merriweather-bold':'text-text-gray font-merriweather-regular' } `}>{item.item}</Text>
            </TouchableOpacity>
          )}
          horizontal
          // pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          // onViewableItemsChanged={handleViewableItemsChanged}
          // viewabilityConfig={handleviewabilityConfig}
          // onScroll={handleScroll}
        />
        {/* <View className="flex-row  items-center justify-center">
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
        </View> */}
      </View>
  );
};

export default FilterSlider;
