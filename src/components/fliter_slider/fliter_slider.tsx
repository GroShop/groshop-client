import {View, Text, FlatList, Animated} from 'react-native';
import React, {useRef} from 'react';
import {useSetState} from '../../utils/functions.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IFilterSlider {
  data: any;
  onPress: any;
  active: string;
}

const FilterSlider = (props: IFilterSlider) => {
  const slideRef = useRef(new Animated.Value(0)).current;
  const [state, setState] = useSetState({
    dotIndex: 0,
    active: props.active,
  });

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

  const handleSlider = (data: any) => {};

  const handleviewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View className="w-full">
      <FlatList
        data={props.data}
        renderItem={(data: any, index: number) => (
          <TouchableOpacity
            className={`mr-4  ${
              data.item === state.active && 'border-b-2 border-primary-green '
            }pb-1`}
            onPress={() => {
              setState({active: data.item}), props.onPress(data.item);
            }}
            activeOpacity={0.7}
            key={index}>
            <Text
              className={` text-[12px] ${
                data.item === state.active
                  ? 'text-primary-green font-merriweather-bold'
                  : 'text-text-gray font-merriweather-regular'
              } `}>
              {data.item}
            </Text>
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
