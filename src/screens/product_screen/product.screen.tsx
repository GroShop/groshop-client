import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  ImageSlider,
  PrimaryButton,
  RatingComponent,
} from 'utils/imports.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProductScreen = (props: any) => {
  const product = [Assets.productIcon, Assets.productIcon, Assets.productIcon];
  return (
    <Container backgroundColor="#E6F8D5">
      <View className="">
        <View className="bg-success w-full h-[250px]  relative rounded-b-[150px] "></View>
        <ScrollView className=" w-full absolute">
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
          <View className="items-center ">
            <ImageSlider imageData={product} height={250} width={281} />
          </View>
          <View className="p-[20px]">
            <View className=" flex-row  pb-2 items-center">
              <View className="bg-primary-green w-[37px]   rounded-br-lg h-[24px] items-center justify-center ">
                <Text className="font-merriweather-bold  text-neutral-white  ">
                  10%
                </Text>
              </View>
              <Text className="font-raleway-bold text-secondary-black ml-2 text-2xl text-start ">
                Orange
              </Text>
            </View>
            <Text className="font-merriweather-regular  text-text-gray  text-base">
              Farm Shop
            </Text>
            <View className="items-center  flex-row py-1 space-x-2">
              <RatingComponent  RatingValue={20}/>
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
                  $7.50
                </Text>
                <Text className="font-raleway-bold text-primary-green text-2xl ">
                  $6.75
                </Text>
              </View>
              <View className="flex-row items-center bg-input-bg rounded-lg">
                <TouchableOpacity>
                  <ImageComponent
                    src={Assets.minusIcon}
                    svg
                    height={32}
                    width={32}
                  />
                </TouchableOpacity>
                <View className="px-2 ">
                  <Text className="font-merriweather-regular text-secondary-black text-[14px] ">
                    1 kg
                  </Text>
                </View>
                <TouchableOpacity>
                  <ImageComponent
                    src={Assets.plusIcon}
                    svg
                    height={32}
                    width={32}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className=" py-[22px] space-y-3">
              <Text className="font-raleway-semi-bold text-secondary-black text-[20px] ">
                Descriptions
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-xs ">
                The orange is the fruit of various citrus species in the family
                Rutaceae; it primarily refers to Citrus × sinensis, which is
                also called sweet orange, to distinguish it from the related
                Citrus × aurantium, referred to as bitter orange.
              </Text>
            </View>
            <View className="flex-row items-center justify-between pt-5 pb-3">
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
      </View>
    </Container>
  );
};

export default ProductScreen;
