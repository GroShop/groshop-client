import Models from 'imports/models.imports';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';
import {Failure, Success, useSetState} from 'utils/functions.utils';
import {
  Assets,
  Container,
  ImageComponent,
  PrimaryButton,
} from 'utils/imports.utils';

const CartScreen = (props: any) => {
  const [state, setState] = useSetState({
    cartData: [],
    totalAmount: 0,
    duplicateCartData:[]
  });

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...state.cartData];
    const prevIndex = state.cartData.findIndex(
      (item: any) => item.key === rowKey,
    );
    deleteCart(state.cartData[prevIndex]._id);
    newData.splice(prevIndex, 1);
    setState({cartData: newData});
  };

  const getManyCart = async () => {
    try {
      let res: any = await Models.cart.getManyCart({});
      let cartData: any = res.data.map((data: any, index: number) => ({
        key: `${index}`,
        ...data,
      }));
      setState({cartData,duplicateCartData: cartData});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const deleteCart = async (body: string) => {
    try {
      await Models.cart.deleteCart({cart_id: body});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const addWishlist = async (body: any) => {
    try {
      let query = {
        wishlist_product: body.product_id,
        cart: 'CART WISHLIST',
      };
      await Models.wishlist.createWishlist(query);
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const editCart = async (body: any) => {
    try {
      // console.log("wight ",body.weight)
      
      await Models.cart.editCart(body);
      const prevIndex = state.duplicateCartData.findIndex(
        (item: any) => item._id === body.cart_id,
      );
      let cartData= state.cartData
      cartData[prevIndex].weight= body.weight 
      totalAmount(cartData)
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const totalAmount = (data:any) => {
    let totalAmount = 0;
    if (!_.isEmpty(state.cartData)) {
      for (let data of state.cartData) {
        totalAmount =
          totalAmount +
          data.cart_product.price * data.weight -
          (data.cart_product.price * data.weight * data.cart_product.discount) /
            100;
      }
    }
    setState({totalAmount})
  };

  useEffect(() => {
    getManyCart();
  }, []);


  useEffect(() => {
    // if(!_.isEmpty(state.cartData)) {
    totalAmount(state.cartData);
    // }
  }, [state.cartData]);


  const VisibleItem = (props: any) => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      addWishlist,
      weightProduct,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }
    const [state, setState] = useSetState({
      productWeight: data.item.weight,
    });
    const {cart_product, _id} = data.item;
    
    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <View style={styles.rowFrontVisible} className="">
          <View className="flex-row  items-center space-x-3 mx-2">
            <View className="">
              <ImageComponent
                src={cart_product.product_pic}
                height={80}
                width={80}
              />
            </View>
            <View className="">
              <Text className="font-merriweather-bold text-secondary-black  text-base ">
                {cart_product.name}
              </Text>
              <Text className="font-merriweather-regular text-secondary-black text-sm">
                {state.productWeight} kg
              </Text>
              <View className="flex-row items-center space-x-1">
                <Text className="font-raleway-semi-bold  text-text-gray  text-[14px] line-through">
                  ₹{cart_product.price * state.productWeight}
                </Text>
                <Text className="font-merriweather-bold text-primary-green text-base ">
                  ₹
                  {cart_product.price * state.productWeight -
                    (cart_product.price *
                      state.productWeight *
                      cart_product.discount) /
                      100}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row justify-between items-center pb-1">
            <TouchableOpacity
              className=""
              onPress={() => {
                let query = {
                  cart_id: _id,
                  product_id: cart_product._id,
                };
                addWishlist(query);
                removeRow();
              }}>
              <Text className="font-merriweather-bold text-primary-green text-[11px] ">
                Move to wishlist
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center bg-input-bg rounded-lg">
              <TouchableOpacity
                onPress={() => {
                  if (state.productWeight !== 1) {
                    let query = {
                      cart_id: _id,
                      weight: state.productWeight - 1,
                    };
                    setState({productWeight: state.productWeight - 1}),
                      weightProduct(query);
                  }
                }}>
                <ImageComponent
                  src={Assets.minusIcon}
                  svg
                  height={32}
                  width={32}
                />
              </TouchableOpacity>
              <View className="px-2 ">
                <Text className="font-merriweather-regular text-secondary-black text-[14px] ">
                  {state.productWeight}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  let query = {
                    cart_id: _id,
                    weight: state.productWeight + 1,
                  };
                  setState({productWeight: state.productWeight + 1});
                  weightProduct(query);
                }}>
                <ImageComponent
                  src={Assets.plusIcon}
                  svg
                  height={32}
                  width={32}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderItem = (data: any, rowMap: any) => {
    const rowHeightAnimatedValue = new Animated.Value(128);
    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
        weightProduct={editCart}
        addWishlist={addWishlist}
      />
    );
  };

  const HiddenItemWithActions = (props: any) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>
        {/* {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
              <ImageComponent src={Assets.trashIcon} height={24} width={24} svg/>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )} */}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -30],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                {/* <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                /> */}
                <ImageComponent
                  src={Assets.trashIcon}
                  height={24}
                  width={24}
                  svg
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const rowActionAnimatedValue = new Animated.Value(0);
    const rowHeightAnimatedValue = new Animated.Value(128);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <Container>
      <View className="items-center flex-row justify-center w-[90%] mx-auto h-[10%]">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="">
          <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
        </TouchableOpacity>
        <View className="items-center w-[90%] ">
          <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
            My Cart
          </Text>
        </View>
      </View>
      <View className="h-[66%]">
        <View className="bg-btn-white h-[380px]">
          <View className="w-[85%] mx-auto ">
            <View className="flex-row space-x-2  items-center h-[66px] ">
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
            <View className="h-[300px] ">
              <SwipeListView
                className="bottom-2"
                data={state.cartData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                // leftOpenValue={75}
                rightOpenValue={-75}
                disableRightSwipe
                // onRowDidOpen={onRowDidOpen}
                showsVerticalScrollIndicator={false}
                // leftActivationValue={75}
                // rightActivationValue={-120}
                // leftActionValue={0}
                // rightActionValue={-500}
                // onLeftAction={onLeftAction}
                // onRightAction={onRightAction}
                // onLeftActionStatusChange={onLeftActionStatusChange}
                // onRightActionStatusChange={onRightActionStatusChange}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="flex-1 space-y-6 w-[90%] mx-auto justify-end mb-9">
        <View className="bg-btn-white  px-4 h-[60px] flex-row items-center justify-between rounded-lg">
          <TouchableOpacity className=" flex-row space-x-2 items-center" onPress={() => props.navigation.navigate('Voucher')}>
            <View className="bg-neutral-white h-[40px] w-[40px] items-center justify-center rounded-lg">
              <ImageComponent
                src={Assets.voucherIcon}
                svg
                height={24}
                width={24}
              />
            </View>
            <Text className="font-raleway-bold text-base text-secondary-black">
              Select Voucher
            </Text>
          </TouchableOpacity>
          <ImageComponent src={Assets.arrowRight} height={24} width={24} svg />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="">
            <Text className="font-merriweather-bold text-secondary-black text-base ">
              Total
            </Text>
            <Text className="font-raleway-bold text-primary-green text-[24px] ">
              ${state.totalAmount}
            </Text>
          </View>
          <View>
            <PrimaryButton
              onPress={() => props.navigation.navigate('CheckoutScreen')}
              btnStyle="bg-primary-green w-[156px] h-[40px]"
              text={'Checkout'}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DF2E2E',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  // backRightBtnLeft: {
  //   backgroundColor: '#1f65ff',
  //   right: 75,
  // },
  backRightBtnRight: {
    backgroundColor: '#DF2E2E',
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  // title: {
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   marginBottom: 5,
  //   color: '#666',
  // },
  // details: {
  //   fontSize: 12,
  //   color: '#999',
  // },
});
