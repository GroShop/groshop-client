import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  ImageSlider,
  PrimaryButton,
  RatingComponent,
} from 'utils/imports.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {Models} from 'imports/models.imports';
import {Failure, useSetState} from 'utils/functions.utils';
import _ from 'lodash';

const ProductScreen = (props: any) => {
  // params
  const route: any = useRoute();
  let productId: any = route.params;

  // state
  const [state, setState] = useSetState({
    productData: {},
    productWeight: 1,
  });

  const getProduct = async () => {
    try {
      let res: any = await Models.product.getProduct(productId);
      setState({productData: res.data});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(productId)) {
      getProduct();
    }
  }, [productId]);

  return (
    <Container backgroundColor="#E6F8D5">
      <ScrollView
        className="w-full h-full"
        showsVerticalScrollIndicator={false}>
        <View className="w-full h-[358px]">
          <View className="w-full h-[250px] bg-success relative  rounded-b-full"></View>
          <View className=" w-full absolute h-[300px]">
            <View className="flex-row justify-between p-[20px] pt-6 pb-2">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => props.navigation.goBack()}>
                <ImageComponent
                  src={Assets.backIcon}
                  svg
                  height={24}
                  width={24}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => props.navigation.goBack()}>
                <ImageComponent
                  src={Assets.favoriteIcon}
                  svg
                  height={24}
                  width={24}
                />
              </TouchableOpacity>
            </View>
            <View className="">
              <ImageSlider data={state.productData.collection_pic} />
            </View>
          </View>
        </View>
        <View className="px-[20px]">
          <View className=" flex-row  pb-2 items-center">
            <View className="bg-primary-green w-[37px]   rounded-br-lg h-[24px] items-center justify-center ">
              <Text className="font-merriweather-bold  text-neutral-white  ">
                {state.productData?.discount}%
              </Text>
            </View>
            <Text className="font-raleway-bold text-secondary-black ml-2 text-2xl text-start ">
              {state.productData?.name}
            </Text>
          </View>
          <Text className="font-merriweather-regular  text-text-gray  text-base">
            Farm Shop
          </Text>
          <View className="items-center  flex-row py-1 space-x-2">
            <RatingComponent RatingValue={state.productData?.rating} />
            <View className="flex-row items-center space-x-1">
              <Text className="font-merriweather-regular  text-secondary-black text-xs">
                4
              </Text>
              <Text className="font-merriweather-regular  text-text-gray  text-xs">
                (1.5k reviews)
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between space-x-1">
            <View className="flex-row items-center space-x-1">
              <Text className="font-raleway-semi-bold  text-text-gray  text-xl line-through">
                ₹{state.productData?.price * state.productWeight}
              </Text>
              <Text className="font-raleway-bold text-primary-green text-2xl ">
                ₹
                {state.productData.price * state.productWeight -
                  (state.productData.price *
                    state.productWeight *
                    state.productData.discount) /
                    100}
              </Text>
            </View>
            <View className="flex-row items-center bg-input-bg rounded-lg">
              <TouchableOpacity
                onPress={() => {
                  setState(
                    state.productWeight !== 1
                      ? {productWeight: state.productWeight - 1}
                      : {},
                  );
                }}
                activeOpacity={0.7}>
                <ImageComponent
                  src={Assets.minusIcon}
                  svg
                  height={32}
                  width={32}
                />
              </TouchableOpacity>
              <View className="px-2 ">
                <Text className="font-merriweather-regular text-secondary-black text-[14px] ">
                  {state.productWeight} kg
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setState({productWeight: state.productWeight + 1});
                }}
                activeOpacity={0.7}>
                <ImageComponent
                  src={Assets.plusIcon}
                  svg
                  height={32}
                  width={32}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-[22px] space-y-3">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px] ">
              Descriptions
            </Text>
            <Text className="font-merriweather-regular text-secondary-black text-xs ">
              {state.productData?.description}
            </Text>
          </View>
          <View className="flex-row items-end justify-between flex-1 py-4">
            <PrimaryButton
              icon={Assets.cartActive}
              btnStyle="bg-light-mode border-[1px] border-primary-green  w-[156px]"
              btnText="text-primary-green "
              iconHeight={18}
              iconWidth={18}
              text={'Add To Cart'}
            />
            <PrimaryButton
              btnStyle="bg-primary-green w-[156px]"
              text={'Buy Now'}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProductScreen;
