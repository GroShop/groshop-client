import {View, Text} from 'react-native';
import React from 'react';
import {
  isoToDateConversion,
  timeConversion,
  useSetState,
} from 'utils/functions.utils';
import StepIndicator from 'react-native-step-indicator';
import {Colors} from 'utils/theme.utils';
import {BOOKING} from 'utils/constant.utils';
import Assets from 'imports/assets.imports';
import ImageComponent from '../image/image.component';
import _ from 'lodash';
import {check} from 'prettier';

const ProgressBar = (props: any) => {
  const [state, setState] = useSetState({
    currentPosition: props.data.length,
  });
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors['primary-green'],
    stepStrokeWidth: 4,
    stepStrokeFinishedColor: Colors['primary-green'],
    stepStrokeUnFinishedColor: Colors['text-gray'],
    separatorFinishedColor: Colors['primary-green'],
    separatorUnFinishedColor: Colors['text-gray'],
    stepIndicatorFinishedColor: '#ffffff',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: Colors['primary-green'],
    stepIndicatorLabelCurrentColor: Colors['primary-green'],
    // stepIndicatorLabelFinishedColor: Colors['primary-green'],
    stepIndicatorLabelUnFinishedColor: '#ffffff',
    // currentStepLabelColor: '#fe7013'
  };
  const imageData: any = [
    {
      activeIcon: Assets.deliveryActive,
      inActiveIcon: Assets.deliveryInactive,
      status: BOOKING.DELIVERED,
    },
    {
      activeIcon: Assets.dispatchActive,
      inActiveIcon: Assets.dispatchInactive,
      status: BOOKING.DISPATCH,
    },
    {
      activeIcon: Assets.processActive,
      inActiveIcon: Assets.processInactive,
      status: BOOKING.PROCESSING,
    },
    {
      activeIcon: Assets.placedActive,
      inActiveIcon: Assets.placedInactive,
      status: BOOKING.ORDERED_PLACED,
    },
  ];

  const statusCheck = (status: string) => {
    let index = _.findIndex(
      props.data,
      (e: any) => {
        return e.status === status;
      },
      0,
    );
    if (_.isNumber(index) && index !== -1) {
      return {
        value: true,
        date: props.data[index].created_at,
      };
    }
    return {
      value: false,
    };
  };

  return (
    <View className="h-full  w-full flex-row space-x-4">
      <View className="flex-col justify-between py-7">
        {imageData.map((item: any) => (
          <View
            className={`bg-input-bg h-[40px] w-[40px]  items-center justify-center  rounded-lg ${
              statusCheck(item.status).value && 'bg-primary-green'
            }`}>
            <ImageComponent
              src={
                statusCheck(item.status).value
                  ? item.activeIcon
                  : item.inActiveIcon
              }
              svg
              height={28}
              width={28}
            />
          </View>
        ))}
      </View>
      <View className="h-full rotate-180">
        <StepIndicator
          customStyles={customStyles}
          currentPosition={state.currentPosition}
          //  renderStepIndicator={}
          direction="vertical"
          stepCount={4}
          // renderStepIndicator={renderStepIndicator}
        />
      </View>
      <View className="flex-col justify-between py-5 flex-1">
        {imageData.map((item: any, index: number) => (
          <View
            className={`border-2  h-[65px]  rounded-xl p-2  flex-col justify-between ${
              statusCheck(item.status).value
                ? ' bg-neutral-white border-primary-green'
                : 'bg-input-bg border-text-gray '
            }`}>
            <Text className="font-raleway-bold text-secondary-black text-[14px]">
              {item.status}
            </Text>
            {statusCheck(item.status).value ? (
              <View className="flex-row justify-between">
                <Text className="font-merriweather-bold text-secondary-black text-[12px]">
                  {isoToDateConversion(statusCheck(item.status).date)}
                </Text>
                <Text className="font-merriweather-bold text-secondary-black text-[12px]">
                  {timeConversion(statusCheck(item.status).date)}
                </Text>
              </View>
            ) : (
              <Text className="font-raleway-bold text-secondary-black text-[14px]">
                --:--
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProgressBar;
