import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  ImageSlider,
  PrimaryButton,
  RatingComponent,
  ScrollViewComponent,
} from '../../utils/imports.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import Models from '../../imports/models.imports';
import {Failure, Success, useSetState} from '../../utils/functions.utils';
import _ from 'lodash';

const ProductScreen = (props: any) => {
  // params
  const route: any = useRoute();
  let productId: any = route.params;

  // state
  const [state, setState] = useSetState({
    productData: {},
    productWeight: 1,
    wishlistProduct: [],
  });

  const createSearchProduct = async () => {
    try {
      let res: any = await Models.searchProduct.createSearchProduct(productId);
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const getProduct = async () => {
    try {
      let res: any = await Models.product.getProduct(productId);
      setState({productData: res.data});
      createSearchProduct();
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const getWishlist = async () => {
    try {
      let res: any = await Models.wishlist.getWishlist({});
      setState({wishlistProduct: res.data.wishlist_product});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const createWishlist = async () => {
    try {
      let query = {
        wishlist_product: productId.product_id,
      };
      let res: any = await Models.wishlist.createWishlist(query);
      setState({wishlistProduct: res.data.wishlist_product});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const createCart = async () => {
    try {
      let query = {
        product: productId.product_id,
        weight: state.productWeight,
      };
      let res: any = await Models.cart.createCart(query);
      Success(res.message);
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(productId)) {
      getProduct();
      getWishlist();
    }
  }, [productId]);

  return (
    <Container backgroundColor="#E6F8D5">
      {/* <ScrollViewComponent> */}
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
              className="w-[34px] items-center"
              activeOpacity={0.7}
              onPress={createWishlist}>
              <ImageComponent
                src={
                  _.some(
                    state.wishlistProduct,
                    e => e._id === productId?.product_id,
                  )
                    ? Assets.favoriteIconActive
                    : Assets.favoriteIconInactive
                }
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
      <View className="p-[20px]  flex-1">
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
              {state.productData?.rating}
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
        <View className="flex-row items-end justify-between flex-1 pb-2">
          <PrimaryButton
            icon={Assets.cartActive}
            btnStyle="bg-light-mode border-[1px] border-primary-green  w-[156px]"
            btnText="text-primary-green "
            iconHeight={18}
            iconWidth={18}
            text={'Add To Cart'}
            onPress={createCart}
          />
          <PrimaryButton
            btnStyle="bg-primary-green w-[156px]"
            text={'Buy Now'}
          />
        </View>
      </View>
      {/* </ScrollViewComponent> */}
    </Container>
  );
};

export default ProductScreen;
