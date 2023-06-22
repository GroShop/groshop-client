import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Assets, ImageComponent} from 'utils/imports.utils';
import {useSetState} from 'utils/functions.utils';

interface ICategories {
  data?: any;
  type?: string;
  onPress?: any;
}

const Categories = (props: ICategories) => {
  // navigation
  const [state, setState] = useSetState({
    product: '',
  });
  const categoriesData:any = [
    {product_pic:"https://res.cloudinary.com/denokpulg/image/upload/v1687253060/Groshop/Product/pngwing.com_7_ug5c4i.png",name:"Fruit"},
    {product_pic:"https://res.cloudinary.com/denokpulg/image/upload/v1687442552/Groshop/Product/pngwing.com_34_rx6wkg.png",name:"Meat"},
    {product_pic:"https://res.cloudinary.com/denokpulg/image/upload/v1687442691/Groshop/Product/pngwing.com_35_qp9gte.png",name:"Vegetable"},
    {product_pic:"https://res.cloudinary.com/denokpulg/image/upload/v1687442863/Groshop/Product/pngegg_aney1u.png",name:"Milk & Egg"},
  ];
  return props.type === 'filterSearch' ? (
    <ScrollView
      className="flex-row "
      horizontal
      showsHorizontalScrollIndicator={false}>
      {props.data &&
        props.data.map((item: any, index: number) => (
          <TouchableOpacity
            className="flex-col items-center w-[]  space-y-1 mr-4 "
            onPress={() => {
               props.onPress(item._id);
            }}
            activeOpacity={0.7}>
            <View
              className={`border-[2px] px-[2px] w-full  ${
                state.product === index 
                  ? 'border-primary-green'
                  : ' border-input-bg'
              } h-[48px] items-center  justify-center rounded-lg`}>
              <ImageComponent src={item.product_pic} height={44} width={44} />
            </View>
            <Text className="font-merriweather-regular text-[11px] text-secondary-black">
              {props.type !== 'filterSearch' ? item._id : item.name}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  ) : (
    <View className="flex-row justify-between">
      {categoriesData &&
       categoriesData.map((item: any, index: number) => (
          <TouchableOpacity
            className="flex-col items-center w-[]  space-y-1  px-2"
            onPress={() => {
              if (state.product=== index) {
                setState({product: ''});
              } else {
                setState({product: index});
              }
             
              props.onPress(item.name);
            }}
            activeOpacity={0.7}>
            <View
              className={`border-[2px] px-[2px] w-full  ${
                state.product === index 
                  ? 'border-primary-green'
                  : ' border-input-bg'
              } h-[48px] items-center  justify-center rounded-lg`}>
              <ImageComponent src={item.product_pic} height={44} width={44} />
            </View>
            <Text className="font-merriweather-regular text-[11px] text-secondary-black">
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default Categories;
