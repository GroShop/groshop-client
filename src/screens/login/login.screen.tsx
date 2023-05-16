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
import {Height, Ratio, Width, useSetState} from '../../utils/functions.utils';

const Login = (props: any) => {
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
  const handleLogin = (data?: any) => {
    // alert(JSON.stringify(data));
  };
  return (
    <Container>
      <View className="w-[90%] h-full mx-auto">
        <View className="h-[46%] items-center justify-evenly pt-2">
          <View className="items-center space-y-2">
            <Text className="font-raleway-semi-bold text-secondary-black text-3xl ">
              Sign In
            </Text>
            <Text className="font-merriweather-regular font-normal text-secondary-black text-xs">
              Fill the field below to Sign In
            </Text>
          </View>

          <ImageComponent
            src={Assets.signIn}
            height={Ratio(265)}
            width={Ratio(250)}
          />
        </View>
        <View className="h-[23%] flex-col space-y-3">
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
          <TouchableOpacity activeOpacity={0.7} onPress={()=>props.navigation.navigate('ForgotPsd')}>
            <Text className="font-raleway-semi-bold text-primary-green text-xs text-right">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-[14%]  items-center justify-around ">
          <PrimaryButton
            onClick={() => handleSubmit(handleLogin)}
            text={'SignUp'}
          />
          <Text className="font-merriweather-regular text-secondary-black text-xs  text-center">
            Or Sign In with
          </Text>
        </View>
        <View className="h-[9%] items-center justify-center  ">
          <SocialMedia />
        </View>
        <View className="h-[8%] justify-center pb-1">
          <View className="items-center justify-center flex-row ">
            <Text className="font-merriweather-regular text-text-gray text-xs ">
              Didn’t have an account?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('SignIn')}>
              <Text className="font-merriweather-bold text-primary-green text-xs ">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Login;
