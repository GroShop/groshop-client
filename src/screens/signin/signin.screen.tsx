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
import SocialMedia from '../../components/socialMedia/social_media';
import {zodResolver} from '@hookform/resolvers/zod';
import {Failure, useSetState} from '../../utils/functions.utils';
import {Models} from 'imports/models.imports';
import {Success} from '../../utils/functions.utils';

const SignIn = (props: any) => {
  // state
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
      confirmPassword: '',
      username: '',
    },
    resolver: zodResolver(Validation.signInScheme),
  });

  const handleSignIn = async (data?: any) => {
    try {
      delete data.confirm_password;
      let res: any = await Models.auth.signup(data);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
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
        <View className="items-center  mb-6 pt-6">
          <Text className="font-raleway-semi-bold text-secondary-black text-3xl  ">
            Sign In
          </Text>
          <Text className="font-merriweather-regular font-normal text-secondary-black text-xs my-2">
            Fill the details and create your new account
          </Text>
        </View>
        <View className="space-y-3">
          <View>
            <Input
              type="text"
              placeholder="Full Name"
              control={control}
              name="username"
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
              name="confirmPassword"
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
            className="flex-row items-center space-x-1 mt-1">
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
        <View className="mt-8 space-y-6">
          <PrimaryButton
            onClick={() => handleSubmit(handleSignIn)}
            text={'SignUp'}
          />
          <Text className="font-merriweather-regular text-secondary-black text-xs  text-center">
            Or Sign In with
          </Text>
        </View>
        <View className="py-8">
          <SocialMedia />
        </View>
        <View className="my-3">
          <View className="items-center justify-center flex-row ">
            <Text className="font-merriweather-regular text-text-gray text-xs ">
              Didn’t have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('Home')}>
              <Text className="font-merriweather-regular text-primary-green text-xs ">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignIn;
