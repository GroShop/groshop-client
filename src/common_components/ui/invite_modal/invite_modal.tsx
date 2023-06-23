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
      {props.type === 'verifyOtp' ? (
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
      ) : (
        ''
      )}
    </Modal>
  );
});

export default InviteModal;
