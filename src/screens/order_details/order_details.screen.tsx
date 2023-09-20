import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {
  Assets,
  CheckoutCart,
  Container,
  ImageComponent,
  PrimaryButton,
  ScrollViewComponent,
} from 'utils/imports.utils';
import {useRoute} from '@react-navigation/native';
import Models from 'imports/models.imports';
import {
  Failure,
  capitalizeFirstLetter,
  timeConversion,
  useSetState,
} from 'utils/functions.utils';
import {BOOKING} from 'utils/constant.utils';
import _ from 'lodash';
import {SwipeListView} from 'react-native-swipe-list-view';

const OrderDetails = (props: any) => {
  const route: any = useRoute();
  let bookingId: any = route.params;

  const [state, setState] = useSetState({
    bookingData: {},
  });

  const getBooking = async () => {
    try {
      let query = {
        booking_id: bookingId,
      };
      let res: any = await Models.booking.getBooking(query);
      setState({bookingData: res.data});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  useMemo(() => {
    if (!_.isEmpty(bookingId)) {
      getBooking();
    }
  }, [bookingId]);

  return (
    <Container>
      {!_.isEmpty(state.bookingData) && (
        <View className="mx-[20px]">
          <View className="items-center flex-row justify-center my-5">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomTabs'}],
                })
              }
              className="">
              <ImageComponent
                src={Assets.backIcon}
                height={24}
                width={24}
                svg
              />
            </TouchableOpacity>
            <View className="items-center w-[90%] ">
              <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[15px]">
                Orders Details
              </Text>
            </View>
          </View>
          <ScrollViewComponent inlineStyle={{paddingBottom: 80}}>
            <View className="  flex-row  justify-between items-center mt-5">
              <Text className="font-raleway-semi-bold text-secondary-black text-[20px]">
                Order Status
              </Text>
            </View>
            {/* <View className='bg-input-bg h-[60px] rounded-lg mt-2'> */}
            <TouchableOpacity
              className="bg-btn-white  px-[12px] h-[60px] flex-row items-center justify-between rounded-lg mt-2"
              onPress={() => props.navigation.navigate('OrderStatus', state.bookingData._id)}
              activeOpacity={0.7}>
              <View className="space-y-1">
                <Text className="font-raleway-semi-bold text-base text-secondary-black">
                  {capitalizeFirstLetter(state.bookingData.status)}
                </Text>
                <Text className="font-merriweather-regular text-[12px] text-secondary-black">
                  {`Today ${timeConversion(state.bookingData.created_at)}`}
                </Text>
              </View>
              <ImageComponent
                src={Assets.arrowRight}
                height={24}
                width={24}
                svg
              />
            </TouchableOpacity>
            {/* </View> */}
            <View className="  flex-row  justify-between items-center mt-5">
              <Text className="font-raleway-semi-bold text-secondary-black text-[20px]">
                Delivery Address
              </Text>
            </View>

            <View className="bg-btn-white max-h-[150px] my-2 rounded-lg pb-3">
              <View className=" mx-[12px]">
                <View className="flex-row space-x-2  items-center  mt-3 ">
                  <View className="h-[40px] w-[40px] rounded-full bg-neutral-white justify-center items-center ">
                    <ImageComponent
                      src={
                        state.bookingData?.address.place === 'Office'
                          ? Assets.officeIcon
                          : Assets.homeOutline
                      }
                      height={24}
                      width={24}
                      svg
                    />
                  </View>
                  <View>
                    <Text className="font-merriweather-bold text-[14px]  text-secondary-black">
                      {state.bookingData?.address?.place}
                    </Text>
                  </View>
                </View>
                <View className="mt-2">
                  <View className="space-y-0.5">
                    <View className="flex-row space-x-1">
                      <Text className="font-merriweather-bold text-[12px]  text-secondary-black">
                        {state.bookingData?.address?.name}
                      </Text>
                      <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
                        {state.bookingData?.address?.phone_number}
                      </Text>
                    </View>
                    <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
                      {state.bookingData?.address?.address}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="bg-btn-white  my-2 rounded-lg h-[300px]">
              <View className="mx-[12px]">
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
                <View className="max-h-[220px]">
                  <ScrollViewComponent
                    nestedScrollEnabled={true}
                    className="space-y-3 "
                    inlineStyle={{paddingBottom: 10}}>
                    {state.bookingData.cart.cart_product.map(
                      (item: any, index: number) => (
                        <View key={index}>
                          <CheckoutCart data={item} />
                        </View>
                      ),
                    )}
                  </ScrollViewComponent>
                </View>
              </View>
            </View>
            <View className="  flex-row  justify-between items-center mt-5">
              <Text className="font-raleway-semi-bold text-secondary-black text-[20px]">
                Payment Details
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-4">
              <Text className="font-merriweather-regular text-secondary-black text-[14px]">
                Total Price
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-[14px]">
                ₹{state.bookingData.amount / 100}
              </Text>
            </View>
            <PrimaryButton
              btnStyle="bg-error"
             onPress={() => props.navigation.navigate('CancelOrder', state.bookingData._id)}
              text={'Cancel Order'}
            />
          </ScrollViewComponent>
        </View>
      )}
    </Container>
  );
};

export default OrderDetails;
