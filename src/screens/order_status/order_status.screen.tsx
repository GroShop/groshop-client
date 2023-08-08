import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {Assets, Container, ImageComponent, ProgressBar} from 'utils/imports.utils';
import { useRoute } from '@react-navigation/native';
import { Failure, useSetState } from 'utils/functions.utils';
import Models from 'imports/models.imports';
import _ from 'lodash';

const OrderStatus = (props: any) => {

  const route: any = useRoute();
  let bookingId: any = route.params;
  const [state, setState] = useSetState({
    bookingData: {},
  });
  const getBooking = async () => {
    try {
      let query = {
        // booking_id:  "64d1f49fb85e115878d5e8c8",
        booking_id: bookingId 
      };
      let res: any = await Models.booking.getBooking(query);
     let trackingData= res.data.tracking_status.sort((a:any,b:any) => a.last_nom - b.last_nom); 
      setState({bookingData: trackingData});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(bookingId)) {
      getBooking();
    }
  }, [bookingId]);

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
              Order Status
            </Text>
          </View>
        </View>
        <View className="w-full p-1 h-[400px] ">
      {state.bookingData&&<ProgressBar data={state.bookingData}/>}
        </View>
      </View>
    </Container>
  );
};

export default OrderStatus;
