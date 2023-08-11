import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Modal, Text, Pressable, View, TouchableOpacity} from 'react-native';
import ImageComponent from '../image/image.component';
import {Ratio, useSetState} from '../../../utils/functions.utils';
import Assets from '../../../imports/assets.imports';
import {useSelector} from 'react-redux';

const InviteModal = forwardRef((props: any, ref) => {
  const modalRef: any = useRef();
  const [state, setState] = useSetState({isModalOpen: false});

  useImperativeHandle(ref, () => ({
    openModal() {
      setState({isModalOpen: true});
    },
    closeModal() {
      setState({isModalOpen: false});
    },
  }));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={state.isModalOpen}
      ref={modalRef}
      hardwareAccelerated={true}
      onRequestClose={() => {
        setState({isModalOpen: false});
      }}>
      {props.type === 'verif1yOtp' ? (
        <View
          className="h-full items-center justify-center"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <View className="w-[90%] items-center justify-center bg-neutral-white shadow-xl rounded-xl p-[35px]">
            <View className="w-[100px] h-[100px] bg-light-green rounded-full items-center justify-center  ">
              <ImageComponent
                svg
                src={Assets.tickIcon}
                height={Ratio(33.33)}
                width={Ratio(46.67)}
              />
            </View>
            <Text className="font-raleway-bold text-[28px] text-primary-green my-3 ">
              Successful
            </Text>
            <Text className="font-merriweather-light text-[14px] text-secondary-black mb-3">
              Your account has been verified
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-primary-green py-[10px] px-[24px] rounded-xl mt-6"
              onPress={() => {
                props.navigation.navigate('ResetPassword');
                setState({isModalOpen: false});
              }}>
              <Text className="font-merriweather-bold text-[14px] text-neutral-white">
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : props.type === 'resetPassword' ? (
        <View
          className="h-full items-center justify-center"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <View className="w-[90%] items-center justify-center bg-neutral-white shadow-xl rounded-xl p-[35px]">
            <View className="w-[100px] h-[100px] bg-light-green rounded-full items-center justify-center  ">
              <ImageComponent
                svg
                src={Assets.tickIcon}
                height={Ratio(33.33)}
                width={Ratio(46.67)}
              />
            </View>
            <Text className="font-raleway-bold text-[28px] text-primary-green my-3 ">
              Successful
            </Text>
            <Text className="font-merriweather-light text-[14px] text-secondary-black mb-3">
              Your password has changed now
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-primary-green py-[10px] px-[24px] rounded-xl mt-6"
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomTabs'}],
                }),
                  setState({isModalOpen: false});
              }}>
              <Text className="font-merriweather-bold text-[14px] text-neutral-white">
                Back To Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : props.type === 'paymentSuccess' ? (
        <View
          className="h-full items-center justify-center"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <View className="w-[90%] items-center justify-center bg-neutral-white shadow-xl rounded-xl p-[35px]">
            <View className="w-[100px] h-[100px] bg-light-green rounded-full items-center justify-center  ">
              <ImageComponent
                svg
                src={Assets.tickIcon}
                height={Ratio(33.33)}
                width={Ratio(46.67)}
              />
            </View>
            <Text className="font-raleway-bold text-[28px] text-primary-green my-3 ">
              Successful
            </Text>
            <Text className="font-merriweather-light text-[14px] text-secondary-black mb-3">
              Your payment is success
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-primary-green py-[10px] justify-center items-center rounded-xl mt-6  w-[150px]"
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'OrderDetails', params: props.data}],
                  });
                  setState({isModalOpen: false});
                }}>
                <Text className="font-merriweather-bold text-[14px] text-neutral-white">
                  Track My Order
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-primary-green py-[10px] justify-center items-center rounded-xl mt-6 w-[150px]"
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'BottomTabs'}],
                  }),
                    setState({isModalOpen: false});
                }}>
                <Text className="font-merriweather-bold text-[14px] text-neutral-white">
                  Back To Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : props.type === 'uploadProfile' ? (
        <TouchableOpacity
          className="h-full items-center justify-center"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          onPress={() => setState({isModalOpen: false})}
          activeOpacity={0.7}>
          <TouchableOpacity
            className="w-[90%]  bg-neutral-white shadow-xl rounded-xl p-[15px] "
            onPress={() => setState({isModalOpen: true})}
            activeOpacity={1}>
            <Text className="font-merriweather-bold text-[18px] text-secondary-black m-2 mb-6">
              Profile
            </Text>
            <View className="flex-row justify-around mb-4">
              {props.data.map((item: any, index: number) => (
                <TouchableOpacity
                  className="items-center  space-y-2"
                  key={index}
                  onPress={() => props.onPress(item.name)}>
                  <View className=" bg-input-bg w-[50px] h-[50px] items-center justify-center rounded-lg">
                    <ImageComponent src={item.pic} height={35} width={35} svg />
                  </View>
                  <Text className="font-merriweather-regular text-[12px]' text-secondary-black">
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        ''
      )}
    </Modal>
  );
});

export default InviteModal;
