import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  LottieComponent,
  RatingComponent,
  ScrollViewComponent,
} from '../../utils/imports.utils';
import {
  Failure,
  isoToDateConvert,
  useSetState,
} from '../../utils/functions.utils';
import Models from '../../imports/models.imports';
import _ from 'lodash';

const MyOrder = (props: any) => {
  const [state, setState] = useSetState({
    bookingData: {},
  });
  const getManyBooking = async () => {
    try {
      setState({loading: true});
      let res: any = await Models.booking.getManyBooking({});
      setState({bookingData: res.data, loading: false});
      console.log('');
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
      setState({loading: false});
    }
  };

  useEffect(() => {
    getManyBooking();
  }, []);

  const ratingProduct = (e: number, id?: string) => {
    console.log('e', e);
  };
  return (
    <Container>
      <View className="items-center flex-row justify-center m-5 ">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="">
          <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
        </TouchableOpacity>
        <View className="items-center w-[90%] ">
          <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[15px]">
            my Order
          </Text>
        </View>
      </View>
      {state.loading ? (
        <View className="h-[80%]">
          <LottieComponent src={Assets.loader} />
        </View>
      ) : (
        <ScrollViewComponent className="space-y-4 ">
          {!_.isEmpty(state.bookingData) ? (
            state.bookingData.map((item: any, index: number) => (
              <View
                className="bg-product-gray shadow-md  rounded-lg w-[90%] mx-auto  my-1 h-[110px]  justify-center"
                style={Platform.OS === 'android' ? styles.shadow : null} key={index}>
                <View className="flex-row  items-center space-x-4 ">
                  <TouchableOpacity
                    className=" w-[80px] flex-row flex-wrap justify-center items-center space-x-2  "
                    activeOpacity={0.7}
                    onPress={() =>
                      props.navigation.navigate(`OrderDetails`, item._id)
                    }>
                    {item?.cart.cart_product.map((img: any, imgIndex: number) =>
                      imgIndex < 3 || item?.cart.cart_product.length === 4 ? (
                        <ImageComponent
                          src={img?.product.product_pic}
                          height={
                            item?.cart?.cart_product.length === 1
                              ? 80
                              : item?.cart?.cart_product.length === 2
                              ? 45
                              : item?.cart?.cart_product.length === 3
                              ? 40
                              : 35
                          }
                          width={
                            item?.cart?.cart_product.length === 1
                              ? 80
                              : item?.cart?.cart_product.length === 2
                              ? 60
                              : item?.cart?.cart_product.length === 3
                              ? 40
                              : 35
                          }
                          key={imgIndex}
                        />
                      ) : (
                        <></>
                      ),
                    )}
                    {item?.cart?.cart_product.length !== 4 &&
                      item?.cart?.cart_product.length > 3 && (
                        <TouchableOpacity
                          className="w-[25px] h-[25px] rounded-full bg-light-gray items-center justify-center "
                          activeOpacity={0.7}
                          onPress={() =>
                            props.navigation.navigate(`OrderDetails`, item._id)
                          }>
                          <Text className="font-merriweather-regular ">
                            {item?.cart?.cart_product.length - 3}
                          </Text>
                        </TouchableOpacity>
                      )}
                  </TouchableOpacity>
                  <View className="flex space-y-1">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        props.navigation.navigate(`OrderDetails`, item._id)
                      }>
                      <Text className="font-merriweather-bold text-secondary-black text-[12px] pb-0.5 ">
                        {`${item.status} on ${isoToDateConvert(
                          item.created_at,
                        )}`}
                      </Text>
                      <Text className="font-merriweather-regular text-secondary-black text-[12px] ">
                        Grocers Food
                      </Text>
                    </TouchableOpacity>
                    <View className="flex space-y-2">
                      <View className="w-[100px] mt-1">
                        <RatingComponent
                          imageSize={22}
                          onClick={(e: any) => ratingProduct(e)}
                        />
                      </View>
                      <Text className="font-merriweather-regular text-secondary-black text-[12px] ">
                        Rate this product now
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <></>
          )}
        </ScrollViewComponent>
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#191A19',
    shadowOpacity: 1,
    elevation: 3,
  },
});
export default MyOrder;
