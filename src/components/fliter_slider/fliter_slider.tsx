import {View, Text, FlatList, Animated} from 'react-native';
import React, {useRef} from 'react';
import {Assets, Container, ImageComponent} from '../../utils/imports.utils';
import {useSetState, width} from '../../utils/functions.utils';
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
       
      </View>
  );
};

export default FilterSlider;
