import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Assets, ImageComponent} from 'utils/imports.utils';
import {useSetState} from 'utils/functions.utils';

interface ICategories {
  categoriesData?: any;
}

const Categories = (props: ICategories) => {
  const [state, setState] = useSetState({
    product: '',
  });
  const categories = [
    Assets.productIcon,
    Assets.productIcon,
    Assets.productIcon,
    Assets.productIcon,
    Assets.productIcon,
    Assets.productIcon,
  ];

  return (
    <ScrollView
      className="flex-row "
      horizontal
      showsHorizontalScrollIndicator={false}>
      {categories.map((item: any, index: number) => (
        <TouchableOpacity
          className="flex-col items-center w-[48px]  space-y-1 mr-4 "
          onPress={() => setState({product: index})}
          activeOpacity={0.7}
          >
          <View
            className={`border-[2px]  w-full ${
              state.product === index
                ? 'border-primary-green'
                : ' border-input-bg'
            } h-[48px] items-center  justify-center rounded-lg`}>
            <ImageComponent
              src={Assets.productIcon}
              height={42}
              width={42}
              svg
            />
          </View>
          <Text className="font-merriweather-regular text-[11px] text-secondary-black">
            Fruit
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;
