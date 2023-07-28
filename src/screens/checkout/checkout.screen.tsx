import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {
  AddressComponent,
  Assets,
  CheckoutCart,
  Container,
  ImageComponent,
  PrimaryButton,
  ScrollViewComponent,
} from 'utils/imports.utils';
import {useSelector} from 'react-redux';

const CheckoutScreen = (props: any) => {
  const cart: any = useSelector((state: any) => state.cart.data);
  return (
    <Container>
      <View className="w-[90%] mx-auto">
        <View className="items-center flex-row justify-center my-5">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.goBack()}
            className="">
            <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
          </TouchableOpacity>
          <View className="items-center w-[90%] ">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[15px]">
              Checkout
            </Text>
          </View>
        </View>
        <ScrollViewComponent inlineStyle={{paddingBottom: 80}}>
          <View className="  flex-row  justify-between items-center mt-5">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]">
              Delivery Address
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('Address')}>
              <Text className="font-raleway-semi-bold text-primary-green text-[12px] px-1 ">
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-btn-white h-[105px] my-2 rounded-lg">
            <View className="w-[95%] mx-auto">
              <View className="flex-row space-x-2  items-center  mt-3 ">
                <View className="h-[40px] w-[40px] rounded-full bg-neutral-white justify-center items-center ">
                  <ImageComponent
                    src={Assets.homeOutline}
                    height={24}
                    width={24}
                    svg
                  />
                </View>
                <View>
                  <Text className="font-merriweather-bold text-[14px]  text-secondary-black">
                    My Home
                  </Text>
                </View>
              </View>
              <View className="mt-2">
                <AddressComponent />
              </View>
            </View>
          </View>
          <View className="bg-btn-white  my-2 rounded-lg h-[300px]">
            <View className="w-[95%] mx-auto">
              <View className="flex-row space-x-2.5  items-center h-[66px] ">
                <View className="h-[40px] w-[40px] rounded-full bg-neutral-white justify-center items-center ">
                  <ImageComponent
                    src={Assets.shopCart}
                    height={24}
                    width={24}
                    svg
                  />
                </View>
                <View>
                  <Text className="font-merriweather-bold text-[14px]  text-secondary-black">
                    Farmer Shop
                  </Text>
                  <Text className="font-merriweather-light text-[11px]  text-text-gray">
                    California
                  </Text>
                </View>
              </View>
              <View className="h-[220px]">
                <ScrollViewComponent
                  className="space-y-3 "
                  inlineStyle={{paddingBottom: 10}}>
                  {cart.product.map((item: any, index: number) => (
                    <View key={index}>
                      <CheckoutCart data={item} />
                    </View>
                  ))}
                </ScrollViewComponent>
              </View>
            </View>
          </View>
          <View className="space-y-2 my-2">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]">
              Note
            </Text>
            <View className="bg-btn-white  h-[100px] rounded-lg px-4 py-2">
              <TextInput
                className="font-merriweather-regular text-[12px] text-secondary-black"
                underlineColorAndroid="transparent"
                placeholder="Add more bubblewrap on the package please"
                placeholderTextColor="#191A19"
                numberOfLines={10}
                multiline={true}
              />
            </View>
          </View>
          <View className="space-y-2 my-2">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]">
              Voucher
            </Text>
            <View className="bg-btn-white  px-4 h-[60px] flex-row items-center justify-between rounded-lg">
              <View className=" flex-row space-x-2 items-center">
                <View className="bg-neutral-white h-[40px] w-[40px] items-center justify-center rounded-lg">
                  <ImageComponent
                    src={Assets.voucherIcon}
                    svg
                    height={24}
                    width={24}
                  />
                </View>
                <Text className="font-raleway-bold text-base text-secondary-black">
                  Discount 10%
                </Text>
              </View>
              <ImageComponent
                src={Assets.arrowRight}
                height={24}
                width={24}
                svg
              />
            </View>
          </View>
          <View className="py-5 space-y-1.5">
            <View className="flex-row justify-between items-center">
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                Subtotal
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                $15.85
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                Delivery Fee
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                $2
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                Discount Voucher 10%
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                -$1.58
              </Text>
            </View>
            <View className="flex-row justify-between items-center pt-1">
              <Text className="font-merriweather-bold text-secondary-black text-base">
                Total Payment
              </Text>
              <Text className="font-raleway-bold text-primary-green text-[20px]">
                $16.27
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between pb-4">
            <View className="">
              <Text className="font-merriweather-bold text-secondary-black text-base ">
                Total
              </Text>
              <Text className="font-raleway-bold text-primary-green text-[24px] ">
                $15.85
              </Text>
            </View>
            <View>
              <PrimaryButton
                onPress={() => props.navigation.navigate('CheckoutScreen')}
                btnStyle="bg-primary-green w-[156px] h-[40px]"
                text={'Select Payment'}
              />
            </View>
          </View>
        </ScrollViewComponent>
      </View>
    </Container>
  );
};

export default CheckoutScreen;
