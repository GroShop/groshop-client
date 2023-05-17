import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  Input,
  PrimaryButton,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import SocialMedia from '../../components/socialMedia/social_media';
import {zodResolver} from '@hookform/resolvers/zod';
import {Height, Ratio, Width, useSetState} from '../../utils/functions.utils';

const ForgotPsd = (props: any) => {
 
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const handleForgotPsd = (data?: any) => {
    // alert(JSON.stringify(data));
    props.navigation.navigate("OtpVerify")
  };

  return (
    <Container>
      <View className="w-[90%] h-full mx-auto">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="h-[5%] justify-end">
          <ImageComponent src={Assets.backIcon} height={20} width={22} />
        </TouchableOpacity>
        <View className="items-center justify-evenly h-[50%]">
          <Text className="font-raleway-semi-bold text-secondary-black text-3xl  ">
            Forgot Password
          </Text>
          <ImageComponent
            src={Assets.passwordImg}
            height={Ratio(265)}
            width={Ratio(250)}
          />
          <Text className="font-merriweather-regular text-secondary-black text-xs ">
            Enter your phone number to verify it’s you, and we will send you a
            one-time authorization code.
          </Text>
        </View>
        <View className="h-[14%] pt-1">
          <View>
            <Input
              type="text"
              placeholder="Email"
              control={control}
              name="email"
            />
          </View>
        </View>
        <View className="h-[36%] ">
          <PrimaryButton
            onClick={()=>handleSubmit(handleForgotPsd)}
            text={'Next'}
          />
        </View>
      </View>
    </Container>
  );
};

export default ForgotPsd;
