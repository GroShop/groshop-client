import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  Input,
  InviteModal,
  OtpComponent,
  PrimaryButton,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import SocialMedia from '../../components/socialMedia/social_media';
import {zodResolver} from '@hookform/resolvers/zod';
import {Height, Ratio, Width, useSetState} from '../../utils/functions.utils';

const OtpVerify = (props: any) => {
  // ref
  const modalRef: any = useRef();
  // state
  const [state, setState] = useSetState({
    passwordIcon: true,
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleOtpVerify = (data?: any) => {
    // alert(JSON.stringify(data));
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
              +62 (302) **** ****
            </Text>
          </View>
        </View>
        <View className=" w-[70%] ml-auto mr-auto mb-10 ">
          <OtpComponent />
        </View>
        <TouchableOpacity
          className="w-full bg-primary-green px-6 py-4 justify-center items-center rounded-lg "
          onPress={() => modalRef.current.openModal()}>
          <Text className="font-merriweather-bold text-[14px] text-neutral-white">
            Verify
          </Text>
        </TouchableOpacity>
        <InviteModal ref={modalRef} />
      </View>
    </Container>
  );
};

export default OtpVerify;
