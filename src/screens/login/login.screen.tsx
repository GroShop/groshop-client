import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  PrimaryInput,
  PrimaryButton,
  Validation,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import SocialMedia from '../../components/socialMedia/social_media';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Failure,
  Ratio,
  Success,
  useSetState,
} from '../../utils/functions.utils';
import Models from '../../imports/models.imports';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    resolver: zodResolver(Validation.loginScheme),
  });
  const handleLogin = async (data?: any) => {
    try {
      console.log('data',data);
      
      let res: any = await Models.auth.login(data);
      await AsyncStorage.setItem('token', res.token);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
      });
      Success(res.message);
   const createChat:any= await Models.chat.createChat({
        users:[ res.data._id,"646489865d00e663e8ff5eeb"]
      })
      await AsyncStorage.setItem('chat', res.data.role==='farmer shop'?'65151b282fc31248367ab48c':createChat.data._id);
      // getUser()
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };
  // const getUser = async () => {
  //   try {
  //     let res: any = await Models.auth.getUser({});
  //     auth(res.data);
  //   } catch (error: any) {
  //     console.log('error', error);
  //     Failure(error.message);
  //   }
  // };
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-[90%] mx-auto "
        style={{height: '100%'}}>
        <View className="items-center  pb-2 pt-3">
          <View className="items-center  space-y-2 pb-2">
            <Text className="font-raleway-semi-bold text-secondary-black text-3xl ">
              Sign In
            </Text>
            <Text className="font-merriweather-regular font-normal text-secondary-black text-xs">
              Fill the field below to Sign In
            </Text>
          </View>
          <ImageComponent
            svg
            src={Assets.signIn}
            height={Ratio(265)}
            width={Ratio(250)}
          />
        </View>
        <View className="space-y-3">
          <View>
            <PrimaryInput
              type="text"
              placeholder="Email"
              control={control}
              name="email"
            />
          </View>
          <View>
            <PrimaryInput
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate('ForgotPsd')}>
            <Text className="font-raleway-semi-bold text-primary-green text-xs text-right">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-5  py-5">
          <PrimaryButton
            onClick={() => handleSubmit(handleLogin)}
            text={'SignUp'}
          />
          <Text className="font-merriweather-regular text-secondary-black text-xs  text-center">
            Or Sign In with
          </Text>
          <View>
            <SocialMedia {...props} />
          </View>
        </View>

        <View className="py-3">
          <View className="items-center justify-center flex-row ">
            <Text className="font-merriweather-regular text-text-gray text-xs ">
              Didn’t have an account?
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
      </ScrollView>
    </Container>
  );
};

export default Login;
