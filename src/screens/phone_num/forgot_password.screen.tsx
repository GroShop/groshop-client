import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  Input,
  PrimaryButton,
  Validation,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Failure, Ratio, Success} from '../../utils/functions.utils';
import {Models} from 'imports/models.imports';
import {auth} from 'utils/redux.utils';

const ForgotPsd = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(Validation.forgotScheme),
  });

  const handleForgotPsd = async (data?: any) => {
    try {
      let res: any = await Models.auth.sendOtp(data);
      auth(res.data);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'OtpVerify'}],
      });
      Success(res.message);
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-[90%] mx-auto "
        style={{height: '100%'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="pt-4 pb-2">
          <ImageComponent src={Assets.backIcon} height={20} width={22} />
        </TouchableOpacity>
        <View className="items-center space-y-3 py-3">
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
        <View className="py-3">
          <View>
            <Input
              type="text"
              placeholder="Email"
              control={control}
              name="email"
            />
          </View>
        </View>
        <View className="py-2 ">
          <PrimaryButton
            onClick={() => handleSubmit(handleForgotPsd)}
            text={'Next'}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ForgotPsd;
