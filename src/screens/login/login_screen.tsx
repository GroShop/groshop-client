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
        <View className="items-center justify-center h-[43%] pt-3">
          <Text className="font-raleway-semi-bold text-secondary-black text-3xl  ">
            Sign In
          </Text>
          <Text className="font-merriweather-regular font-normal text-secondary-black text-xs my-2">
            Fill the field below to Sign In
          </Text>
          <ImageComponent
            src={Assets.signIn}
            height={Width(59)}
            width={Width(55)}
          />
        </View>
        <View className="h-[25%]   flex-col gap-y-3 ">
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
              iconOnPress={  state.passwordIcon
                ? Assets.eyeInActive
                :Assets.eyeActive }
              onClick={() => {
                setState({passwordIcon: !state.passwordIcon});
              }}
            />
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="font-raleway-semi-bold text-primary-green text-xs text-right">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-[16%]  items-center justify-around ">
          <PrimaryButton
            onClick={() => handleSubmit(handleLogin)}
            text={'SignUp'}
          />
          <Text className="font-merriweather-regular text-secondary-black text-xs  text-center">
            Or Sign In with
          </Text>
        </View>
        <View className="h-[10%] items-center justify-center">
          <SocialMedia />
        </View>
        <View className="items-center justify-center flex-row h-[6%]">
          <Text className="font-merriweather-regular text-text-gray text-xs ">
            Didn’t have an account?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate('SignIn')}>
            <Text className="font-merriweather-regular text-primary-green text-xs ">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
