import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  Assets,
  Container,
  ImageComponent,
  LottieComponent,
  ScrollViewComponent,
} from '../../utils/imports.utils';
import {Failure, useSetState} from '../../utils/functions.utils';
import Models from '../../imports/models.imports';
import {useEffect} from 'react';

const WishList = (props: any) => {
  const [state, setState] = useSetState({
    wishlistData: [],
  });
  const getWishlist = async () => {
    try {
      setState({loading: true});
      let res: any = await Models.wishlist.getWishlist({});
      setState({wishlistData: res.data.wishlist_product, loading: false});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
      setState({loading: false});
    }
  };
  const removeWishlist = async (data: any) => {
    try {
      setState({loading: true});
      let query = {
        wishlist_product: data,
      };
      let res: any = await Models.wishlist.removeWishlist(query);
      setState({wishlistData: res.data.wishlist_product, loading: false});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
      setState({loading: false});
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

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
      {state.loading ? (
        <View className="h-[80%]">
          <LottieComponent src={Assets.loader} />
        </View>
      ) : (
        <ScrollViewComponent>
          <View className="space-y-4 m-5 relative">
            {state.wishlistData.map((item: any, index: number) => (
              <View
                className="bg-product-gray shadow-md p-2 rounded-lg"
                style={Platform.OS === 'android' ? styles.shadow : null}>
                <TouchableOpacity
                  className="flex-row justify-between"
                  activeOpacity={0.7}
                  onPress={() =>
                    props.navigation.navigate(`ProductScreen`, {
                      product_id: item._id,
                    })
                  }>
                  <View className="flex-row  items-center space-x-3 mx-2">
                    <View className="">
                      <ImageComponent
                        src={item.product_pic}
                        height={80}
                        width={80}
                      />
                    </View>
                    <View>
                      <Text className="font-merriweather-bold text-secondary-black  text-base ">
                        {item.name}
                      </Text>
                      <Text className="font-merriweather-regular text-secondary-black text-sm">
                        1 kg
                      </Text>
                      <View className="flex-row space-x-1 items-center pb-1">
                        <Text className="font-merriweather-regular text-text-gray text-sm line-through">
                          ₹{item.price}
                        </Text>
                        <Text className="font-merriweather-bold text-primary-green text-base ">
                          ₹{item.price - (item.price * item.discount) / 100}
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
                </TouchableOpacity>
                <View className="flex-row justify-between items-center pb-1">
                  <TouchableOpacity
                    className="mt-1 ml-1"
                    onPress={() => removeWishlist(item._id)}>
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
            ))}
          </View>
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
export default WishList;
