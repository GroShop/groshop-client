import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  InviteModal,
  OtpComponent,
} from '../../utils/imports.utils';
import {Failure, Success, useSetState} from '../../utils/functions.utils';
import {Models} from '../../imports/models.imports';
import {useSelector} from 'react-redux';

const OtpVerify = (props: any) => {
  // ref
  const auth: any = useSelector((state: any) => state.auth.data);
  const verifyRef: any = useRef();

  const [state, setState] = useSetState({
    otp: '',
    resend: 60,
  });
  const handleOtpVerify = async () => {
    if (auth.otp_verify) {
      try {
        let query: any = {
          email: auth.email,
          otp: state.otp,
        };
        let res: any = await Models.auth.verifyOtp(query);
        verifyRef.current.openModal();
        Success(res.message);
      } catch (error: any) {
        console.log('error', error);
        Failure(error.message);
      }
    }
  };

  return (
    <Container>
      <View className="w-[90%] h-full mx-auto">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="pt-4 pb-2">
          <ImageComponent src={Assets.backIcon} height={20} width={22} />
        </TouchableOpacity>
        <View className="items-center py-3 space-y-1">
          <Text className="font-raleway-semi-bold text-secondary-black text-3xl mb-9 ">
            Verify Your Number
          </Text>
          <View className="items-center space-y-3">
            <Text className="font-merriweather-regular  text-xs text-verify ">
              4 digit code send to
            </Text>
            <Text className="font-merriweather-bold text-secondary-black text-sm ">
              {auth.email}
            </Text>
          </View>
        </View>
        <View className=" w-[70%] ml-auto mr-auto mb-10 ">
          <OtpComponent
            onOtpChange={(value: any) => {
              setState({otp: value});
            }}
            resendData={state.resend}
          />
        </View>
        <TouchableOpacity
          className="w-full bg-primary-green px-6 py-4 justify-center items-center rounded-lg "
          onPress={handleOtpVerify}>
          <Text className="font-merriweather-bold text-[14px] text-neutral-white">
            Verify
          </Text>
        </TouchableOpacity>
        <InviteModal ref={verifyRef} {...props} type={'verifyOtp'}/>
      </View>
    </Container>
  );
};

export default OtpVerify;
