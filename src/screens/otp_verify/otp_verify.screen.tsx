import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  Input,
  OtpComponent,
  PrimaryButton,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import SocialMedia from '../../components/socialMedia/social_media';
import {zodResolver} from '@hookform/resolvers/zod';
import {Height, Ratio, Width, useSetState} from '../../utils/functions.utils';

const OtpVerify = (props: any) => {
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
          onPress={() => props.navigation.navigate('SignIn')}
          className="h-[5%] justify-end">
          <ImageComponent src={Assets.backIcon} height={20} width={22} />
        </TouchableOpacity>
        <View className="items-center justify-around h-[20%]">
          <Text className="font-raleway-semi-bold text-secondary-black text-3xl  ">
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
        <View className="h-[14%] w-[70%] ml-auto mr-auto  ">
          <OtpComponent />
        </View>
        <View className="h-[61%] pt-2 ">
          <PrimaryButton
            onClick={() => handleSubmit(handleOtpVerify)}
            text={'Verify'}
          />
        </View>
      </View>
    </Container>
  );
};

export default OtpVerify;
