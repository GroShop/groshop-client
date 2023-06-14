import React, {useState} from 'react';
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
import {
  Assets,
  Container,
  ImageComponent,
  PrimaryButton,
} from 'utils/imports.utils';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Notifications from '../model/Notifications';
const Notifications = [
  {
    id: 1,
    title: 'Your pizza order placed successfully',
    details:
      'Your pizza order to snack corner has been accepted and being processed.',
  },
  {
    id: 2,
    title: 'Your bengali thali order has been delivered',
    details: 'Your bengali thali has been delivered by Delicious Bong Recipe.',
  },
  {
    id: 3,
    title: 'Out for delivery',
    details: 'Bengali thali will reach to you within 30 minutes.',
  },
];

const CartScreen = (props: any) => {
  const [listData, setListData] = useState(
    Notifications.map((NotificationItem, index) => ({
      key: `${index}`,
      title: NotificationItem.title,
      details: NotificationItem.details,
    })),
  );

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = (props: any) => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
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

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <View style={styles.rowFrontVisible} className="">
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
              <Text className="font-merriweather-bold text-secondary-black text-base ">
                $7.50
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center pb-1">
            <TouchableOpacity className="">
              <Text className="font-merriweather-bold text-primary-green text-[11px] ">
                Move to wishlist
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center bg-input-bg rounded-lg">
              <TouchableOpacity>
                <ImageComponent
                  src={Assets.minusIcon}
                  svg
                  height={32}
                  width={32}
                />
              </TouchableOpacity>
              <View className="px-2 ">
                <Text className="font-merriweather-regular text-secondary-black text-[14px] ">
                  1
                </Text>
              </View>
              <TouchableOpacity>
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
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
                disableRightSwipe
                onRowDidOpen={onRowDidOpen}
                showsVerticalScrollIndicator={false}
                // leftActivationValue={75}
                // rightActivationValue={-120}
                // leftActionValue={0}
                // rightActionValue={-500}
                onLeftAction={onLeftAction}
                onRightAction={onRightAction}
                onLeftActionStatusChange={onLeftActionStatusChange}
                onRightActionStatusChange={onRightActionStatusChange}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="h-[24%] space-y-4 w-[90%] mx-auto justify-end pb-8">
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
              Select Voucher
            </Text>
          </View>
          <ImageComponent src={Assets.arrowRight} height={24} width={24} svg />
        </View>
        <View className="flex-row items-center justify-between">
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
            onPress={()=>props.navigation.navigate('CheckoutScreen')}
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
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
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
    backgroundColor: '#DDD',
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
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
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
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
