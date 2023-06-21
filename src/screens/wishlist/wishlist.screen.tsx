import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Assets, Container, ImageComponent} from '../../utils/imports.utils';
import {ScrollView} from 'react-native-gesture-handler';

const WishList = (props: any) => {
  return (
    <Container>
      <View className="items-center flex-row justify-center m-5">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="">
          <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
        </TouchableOpacity>
        <View className="items-center w-[90%] ">
          <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[15px]">
            My Wishlist
          </Text>
        </View>
      </View>
      <ScrollView className="mb-5 " showsVerticalScrollIndicator={false}>
        <View className="space-y-4 m-5 relative">
          <View
            className="bg-product-gray shadow-md p-2 rounded-lg"
            style={Platform.OS === 'android' ? styles.shadow : null}>
            <View className="flex-row justify-between">
              <View className="flex-row  items-center space-x-3 mx-2">
                <View className="">
                  <ImageComponent
                    src={Assets.productIcon}
                    height={80}
                    width={80}
                    svg
                  />
                </View>
                <View>
                  <Text className="font-merriweather-bold text-secondary-black  text-base ">
                    Orange
                  </Text>
                  <Text className="font-merriweather-regular text-secondary-black text-sm">
                    1 kg
                  </Text>
                  <View className="flex-row space-x-1 items-center pb-1">
                    <Text className="font-merriweather-regular text-text-gray text-sm line-through">
                      ₹6.2
                    </Text>
                    <Text className="font-merriweather-bold text-primary-green text-base ">
                      {/* ₹{item.price-(item.price*item.discount/100)} */}
                      $7.50
                    </Text>
                  </View>
                </View>
              </View>
              <View className="">
                <ImageComponent
                  src={Assets.favoriteIconActive}
                  height={24}
                  width={24}
                  svg
                />
              </View>
            </View>
            <View className="flex-row justify-between items-center pb-1">
              <TouchableOpacity className="mt-1 ml-1">
                <Text className="font-merriweather-bold text-text-gray text-[11px] ">
                  Remove from wishlist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.4}
                className="items-center justify-center absolute right-0 bottom-1 bg-primary-green  h-[36px] w-[36px]  rounded-full"
                onPress={() =>
                  props.navigation.navigate(`ProductScreen`, {
                    product_id: item._id,
                  })
                }>
                <ImageComponent
                  src={Assets.buyCart}
                  svg
                  height={24}
                  width={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
export default WishList;
