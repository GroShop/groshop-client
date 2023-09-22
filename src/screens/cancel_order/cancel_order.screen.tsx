import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  LottieComponent,
  PrimaryButton,
  Textarea,
} from '../../utils/imports.utils';
import {Failure, Success, useSetState} from '../../utils/functions.utils';
import {useForm} from 'react-hook-form';
import Models from '../../imports/models.imports';
import {BOOKING} from '../../utils/constant.utils';
import {useRoute} from '@react-navigation/native';
import _ from 'lodash';

const CancelOrder = (props: any) => {
  const route: any = useRoute();
  let bookingId: any = route.params;
  const [state, setState] = useSetState({
    cancel_reason: '',
  });

  const cancelBooking = async () => {
    try {
      setState({loading: true});
      let query: any = {
        booking_id: bookingId,
        status: BOOKING.CANCELLED,
      };
      if (state.cancel_reason === 'Other / Change of mind') {
        if (!_.isEmpty(watch().other)) {
          query.cancel_reason = watch().other;
        } else {
          return Failure('Please text reason');
        }
      } else {
        query.cancel_reason = state.cancel_reason;
      }
      if (_.isEmpty(query.cancel_reason)) {
        return Failure('Please click reason');
      }
      await Models.booking.editBooking(query);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
      });
      reset({
        other: '',
      });
      setState({cancel_reason: '', loading: false});
      Success('SuccessFully Cancelled');
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
      setState({loading: false});
    }
  };

  const reasonData = [
    'Need to change delivery address',
    'Seller is not responsive',
    'Need to change the amount',
    'Other / Change of mind',
  ];

  const {
    control,
    watch,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      other: '',
    },
  });

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
              Cancelation Reason
            </Text>
          </View>
        </View>
        {state.loading ? (
          <View className="h-[80%]">
            <LottieComponent src={Assets.loader} />
          </View>
        ) : (
          <View className="w-full my-3 ">
            <View>
              <Text className="font-merriweather-semibold text-secondary-black text-[16px] ">
                Please select your cancelation reason
              </Text>
            </View>
            <View className="space-y-4 my-3">
              {reasonData.map((item: string, index: number) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setState(
                      state.cancel_reason === item
                        ? {cancel_reason: ''}
                        : {cancel_reason: item},
                    )
                  }
                  className="flex-row items-center space-x-1  mt-1"
                  key={index}>
                  <ImageComponent
                    svg
                    src={
                      item === state.cancel_reason
                        ? Assets.checkBoxActive
                        : Assets.checkBoxInActive
                    }
                    height={26}
                    width={26}
                  />
                  <Text className="font-merriweather-regular text-secondary-black text-[14px]">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {state.cancel_reason === 'Other / Change of mind' && (
              <View className="w-full mb-6 mt-2">
                <Textarea
                  textAreaSize={20}
                  type="text"
                  control={control}
                  name="other"
                />
              </View>
            )}
            <View className="mt-7">
              <PrimaryButton onPress={cancelBooking} text={'Confirm'} />
            </View>
          </View>
        )}
      </View>
    </Container>
  );
};

export default CancelOrder;
