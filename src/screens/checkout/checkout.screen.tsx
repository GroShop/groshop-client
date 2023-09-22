import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useRef} from 'react';
import {
  Assets,
  CheckoutCart,
  Container,
  ImageComponent,
  InviteModal,
  PrimaryButton,
  ScrollViewComponent,
} from '../../utils/imports.utils';
import {useSelector} from 'react-redux';
import _ from 'lodash';
// @ts-ignore
import RazorpayCheckout from 'react-native-razorpay';
import {Colors} from '../../utils/theme.utils';
import {BOOKING_PAYMENT} from '../../utils/constant.utils';
import Models from '../../imports/models.imports';
import {Failure, useSetState} from '../../utils/functions.utils';

const CheckoutScreen = (props: any) => {
  const cart: any = useSelector((state: any) => state.cart.data);
  const voucher: any = useSelector((state: any) => state.voucher.data);
  const auth: any = useSelector((state: any) => state.auth.data);
  const paymentRef: any = useRef();
  const [state, setState] = useSetState({
    bookingId: '',
  });
  const razorPayment = async () => {
    try {
      let query: any = {
        order: {
          currency: 'INR',
          amount: totalPayAmount() * 100,
          receipt: 'receipt#1',
        },
        cart: cart.cart_id,
        amount: totalPayAmount() * 100,
        payment_type: BOOKING_PAYMENT.ONLINE_PAYMENT,
      };
      if (!_.isEmpty(auth.address)) {
        for (let data of auth.address) {
          if (data.default_address) {
            delete data._id;
            query.address = data;
          }
        }
      }
      if (!_.isEmpty(voucher)) {
        query.voucher = voucher._id;
      }
      const res: any = await Models.booking.createBooking(query);
      var options: any = {
        // description: 'Credits towards consultation',
        currency: 'INR',
        amount: '',
        key: 'rzp_test_5E9saBhBEvuN7m',
        name: auth.username,
        order_id: res.data.razorpay_order_id,
        prefill: {
          email: auth.email,
          contact: res.data?.address.phone_number,
          name: auth.username,
        },
        theme: {color: Colors['primary-green']},
      };
      if (!_.isEmpty(auth?.profile_picture)) {
        options.image = auth.profile_picture;
      }
      RazorpayCheckout.open(options)
        .then((data: any) => {
          setState({bookingId: res.data._id});
          paymentRef.current.openModal();
        })
        .catch((err: any) => {
          console.log('res', err);
        });
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };
  const totalPayAmount = () => {
    return !_.isEmpty(voucher) && voucher?.name !== 'Free Shipping'
      ? Math.round(
          cart.totalAmount + 100 - (cart.totalAmount * voucher.discount) / 100,
        )
      : voucher?.name === 'Free Shipping'
      ? Math.round(cart.totalAmount)
      : Math.round(cart.totalAmount + 100);
  };

  return (
    <Container>
      <View className="mx-[20px]">
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
                {!_.isEmpty(auth?.address) ? 'Change' : 'Add Address'}
              </Text>
            </TouchableOpacity>
          </View>
          {auth?.address &&
            auth.address.map((item: any, index: number) => {
              return (
                item.default_address && (
                  <View
                    className="bg-btn-white max-h-[150px] my-2 rounded-lg pb-3"
                    key={index}>
                    <View className="w-[95%] mx-auto">
                      <View className="flex-row space-x-2  items-center  mt-3 ">
                        <View className="h-[40px] w-[40px] rounded-full bg-neutral-white justify-center items-center ">
                          <ImageComponent
                            src={
                              item.place === 'Office'
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
                            {item.place}
                          </Text>
                        </View>
                      </View>
                      <View className="mt-2">
                        <View className="space-y-0.5">
                          <View className="flex-row space-x-1">
                            <Text className="font-merriweather-bold text-[12px]  text-secondary-black">
                              {item?.name}
                            </Text>
                            <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
                              {item?.phone_number}
                            </Text>
                          </View>
                          <Text className="font-merriweather-regular text-[12px]  text-secondary-black">
                            {item?.address}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              );
            })}
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
              <View className="max-h-[220px]">
                <ScrollViewComponent
                  nestedScrollEnabled={true}
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
            <TouchableOpacity
              className="bg-btn-white  px-4 h-[60px] flex-row items-center justify-between rounded-lg"
              onPress={() => props.navigation.navigate('Voucher')}
              activeOpacity={0.7}>
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
                  {!_.isEmpty(voucher)
                    ? voucher.name === 'Discount'
                      ? `${voucher.name} ${voucher.discount}%`
                      : voucher.name
                    : 'Select Voucher'}
                </Text>
              </View>
              <ImageComponent
                src={Assets.arrowRight}
                height={24}
                width={24}
                svg
              />
            </TouchableOpacity>
          </View>
          <View className="py-5 space-y-1.5">
            <View className="flex-row justify-between items-center">
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                Subtotal
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                ₹{cart.originalAmount}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                Discount Product
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                -₹{cart.originalAmount - cart.totalAmount}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                Delivery Fee
              </Text>
              {voucher?.name !== 'Free Shipping' ? (
                <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                  ₹100
                </Text>
              ) : (
                <Text className="font-merriweather-regular text-primary-green text-[12px]">
                  Free
                </Text>
              )}
            </View>
            {!_.isEmpty(voucher) && voucher?.name !== 'Free Shipping' && (
              <View className="flex-row justify-between items-center">
                <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                  Discount Voucher {voucher.discount}%
                </Text>
                <Text className="font-merriweather-regular text-secondary-black text-[12px]">
                  -₹{Math.round((cart.totalAmount * voucher.discount) / 100)}
                </Text>
              </View>
            )}
            <View className="flex-row justify-between items-center pt-1">
              <Text className="font-merriweather-bold text-secondary-black text-base">
                Total Payment
              </Text>
              <Text className="font-raleway-bold text-primary-green text-[20px]">
                ₹{totalPayAmount()}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between pb-4">
            <View className="">
              <Text className="font-merriweather-bold text-secondary-black text-base ">
                Total
              </Text>
              <Text className="font-raleway-bold text-primary-green text-[24px] ">
                ₹{totalPayAmount()}
              </Text>
            </View>
            <View>
              <PrimaryButton
                onPress={razorPayment}
                btnStyle="bg-primary-green w-[156px] h-[40px]"
                text={'Select Payment'}
              />
              <InviteModal
                ref={paymentRef}
                {...props}
                data={state.bookingId}
                type={'paymentSuccess'}
              />
            </View>
          </View>
        </ScrollViewComponent>
      </View>
    </Container>
  );
};

export default CheckoutScreen;
