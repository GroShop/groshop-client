import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  PrimaryInput,
  InviteModal,
  PrimaryButton,
  Validation,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Failure, Success, useSetState} from '../../utils/functions.utils';
import Models from '../../imports/models.imports';
import {useSelector} from 'react-redux';

const ResetPassword = (props: any) => {
  // ref
  const resetRef: any = useRef();

  // redux
  const auth: any = useSelector((state: any) => state.auth.data);

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
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(Validation.resetScheme),
  });

  const handleResetPassword = async (data?: any) => {
    try {
      let query: any = {
        email: auth.email,
        password: data.password,
      };
      let res: any = await Models.auth.editPassword(query);
      resetRef.current.openModal();
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
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
        <View className="items-center flex-row py-10">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.goBack()}
            className="">
            <ImageComponent src={Assets.backIcon} height={20} width={22} />
          </TouchableOpacity>
          <View className="items-center w-[90%] ">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
              Reset Password
            </Text>
          </View>
        </View>
        <Text className="font-merriweather-regular text-secondary-black text-[12px] my-1">
          Your new password must be different from your previous password
        </Text>
        <View className="py-5 space-y-4">
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
          <View>
            <PrimaryInput
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
        </View>
        <View className="pt-9">
          <PrimaryButton
            onClick={() => handleSubmit(handleResetPassword)}
            text={'Reset Password'}
          />
          <InviteModal ref={resetRef} type={'resetPassword'} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ResetPassword;
