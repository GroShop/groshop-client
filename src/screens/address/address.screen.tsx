import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  AddressComponent,
  Assets,
  BottomModal,
  Container,
  ImageComponent,
  PrimaryButton,
  PrimaryInput,
} from '../../utils/imports.utils';
import {Failure, useSetState} from '../../utils/functions.utils';
import Models from '../../imports/models.imports';
import _ from 'lodash';
import {useForm} from 'react-hook-form';
//@ts-check

const Address = (props: any) => {
  // ref
  const addressRef: any = useRef();
  // state
  const [state, setState] = useSetState({
    addressData: [],
  });

  const getManyVoucher = async () => {
    try {
      let res: any = await Models.voucher.getManyVoucher({});
      setState({addressData: res.data});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  // useEffect(() => {
  //   getManyVoucher();
  // }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    // resolver: zodResolver(Validation.resetScheme),
  });

  return (
    <Container>
      <View className="items-center flex-row py-6 px-5">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          className="">
          <ImageComponent src={Assets.backIcon} height={20} width={22} svg />
        </TouchableOpacity>
        <View className="items-center w-[90%] ">
          <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
            Address
          </Text>
        </View>
      </View>
      <View className="bg-btn-white h-[105px] my-2 mx-5 rounded-lg">
        <View className="w-[95%] mx-auto">
          <View className="flex-row space-x-2  items-center  mt-3 ">
            <View className="h-[40px] w-[40px] rounded-full bg-neutral-white justify-center items-center ">
              <ImageComponent
                src={Assets.homeOutline}
                height={24}
                width={24}
                svg
              />
            </View>
            <View>
              <Text className="font-merriweather-bold text-[14px]  text-secondary-black">
                My Home
              </Text>
            </View>
          </View>
          <View className="mt-2">
            <AddressComponent />
          </View>
        </View>
      </View>
      <View className="px-5 flex-1 justify-end pb-7">
        <PrimaryButton
          onPress={() => addressRef.current.openModal()}
          text={'Add Address'}
        />
        <BottomModal ref={addressRef} height={380}>
          <View className="px-4">
            <Text className="font-raleway-semi-bold text-[20px] text-secondary-black pt-2 pb-1">
              Address Detail
            </Text>

            <View className="py-5  space-y-4">
              <View>
                <PrimaryInput
                  type="text"
                  placeholder="Password"
                  control={control}
                  name=""
                  securityPassword={state.passwordIcon}
                  // iconOnPress={
                  //   state.passwordIcon ? Assets.eyeInActive : Assets.eyeActive
                  // }
                  onClick={() => {
                    setState({passwordIcon: !state.passwordIcon});
                  }}
                />
              </View>
              <View>
                <PrimaryInput
                  type="text"
                  placeholder="Password"
                  control={control}
                  name="password"
                  securityPassword={state.passwordIcon}
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
                  onClick={() => {
                    setState({confirmPasswordIcon: !state.confirmPasswordIcon});
                  }}
                />
              </View>
            </View>
            <PrimaryButton
              onPress={() => addressRef.current.openModal()}
              text={'Save Address'}
            />
          </View>
        </BottomModal>
      </View>
    </Container>
  );
};

export default Address;
