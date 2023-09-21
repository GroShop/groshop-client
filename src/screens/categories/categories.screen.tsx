import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Assets from 'imports/assets.imports';
import {Container, ImageComponent, ProductCard, ScrollViewComponent} from 'utils/imports.utils';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const Categories = (props: any) => {
  // redux
  const filterProduct: any = useSelector(
    (state: any) => state.filterProduct.data,
  );
  return (
    <Container>
      <View className="w-[90%] mx-auto ">
        <View className="items-center flex-row py-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.goBack()}
            className="">
            <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
          </TouchableOpacity>
          <View className="items-center w-[90%] ">
            <Text className="font-raway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
              Categories 
            </Text>
          </View>
        </View>
      </View>
      {!_.isEmpty(filterProduct) ? ( 
         <ScrollViewComponent
          className="bg-product-gray h-full">
          <View className="w-full flex-row justify-between flex-wrap px-5">
            <ProductCard {...props} data={filterProduct} />
          </View>
        </ScrollViewComponent>
       ) : (
        <View className="w-full h-[80%] justify-center items-center">
          <Text className="font-merriweather-bold text-lg text-text-gray">
            No Data Found
          </Text>
        </View>
      )}
    </Container>
  );
};

export default Categories;
