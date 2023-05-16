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
import {z} from 'zod';
import {Height, Width, useSetState} from '../../utils/functions.utils';
const SignIn = (props: any) => {
  const [state, setState] = useSetState({
    passwordIcon: true,
    confirmPasswordIcon: true,
    privacyPolicy: false,
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
  const handleSignIn = (data?: any) => {
    // alert(JSON.stringify(data));
  };
  return (
    <Container>
      <View className="w-[90%] h-full mx-auto">
        <View className="items-center justify-end h-[11%] pt-3 ">
          <Text className="font-raleway-semi-bold text-secondary-black text-3xl  ">
            Sign In
          </Text>
          <Text className="font-merriweather-regular font-normal text-secondary-black text-xs my-2">
            Fill the details and create your new account
          </Text>
        </View>
        <View className="h-[46%]  flex-col justify-evenly py-2  ">
          <View>
            <Input
              type="text"
              placeholder="Full Name"
              control={control}
              name="name"
            />
          </View>
          <View>
            <Input
              type="text"
              placeholder="Email"
              control={control}
              name="email"
            />
          </View>
          <View>
            <Input
              type="text"
              placeholder="Password"
              control={control}
              name="password"
              securityPassword={state.passwordIcon}
              iconOnPress={
                state.passwordIcon ? Assets.eyeInActive : Assets.eyeActive
              }
              onClick={() => {
                setState({passwordIcon: !state.passwordIcon});
              }}
            />
          </View>
          <View>
            <Input
              type="text"
              placeholder="Confirm Password"
              control={control}
              name="confirm_password"
              securityPassword={state.confirmPasswordIcon}
              iconOnPress={
                state.confirmPasswordIcon
                  ? Assets.eyeInActive
                  : Assets.eyeActive
              }
              onClick={() => {
                setState({confirmPasswordIcon: !state.confirmPasswordIcon});
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setState({privacyPolicy: !state.privacyPolicy})}
            className="flex-row items-center space-x-1">
            <ImageComponent
              src={
                state.privacyPolicy
                  ? Assets.checkBoxActive
                  : Assets.checkBoxInActive
              }
              height={20}
              width={20}
            />
            <Text className="font-merriweather-regular text-secondary-black text-xs ">
              I have read and agree to the
            </Text>
            <Text className="font-merriweather-regular text-primary-green text-xs ">
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-[17%]  items-center justify-around  ">
          <PrimaryButton
            onClick={() => props.navigation.navigate('PhoneNum')}
            text={'SignUp'}
          />
          <Text className="font-merriweather-regular text-secondary-black text-xs  text-center">
            Or Sign In with
          </Text>
        </View>
        <View className="h-[10%] items-center justify-center">
          <SocialMedia />
        </View>
        <View className="h-[15%] justify-end pb-5">
          <View className="items-center justify-center flex-row ">
            <Text className="font-merriweather-regular text-text-gray text-xs ">
              Didn’t have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('Login')}>
              <Text className="font-merriweather-regular text-primary-green text-xs ">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default SignIn;
