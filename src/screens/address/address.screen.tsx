import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  AddressComponent,
  Assets,
  BottomModal,
  Container,
  DropDown,
  ImageComponent,
  LottieComponent,
  PrimaryButton,
  PrimaryInput,
  ScrollViewComponent,
  Validation,
} from '../../utils/imports.utils';
import {Failure, useSetState} from '../../utils/functions.utils';
import Models from '../../imports/models.imports';
import _ from 'lodash';
import {useForm} from 'react-hook-form';
import TextArea from 'common_components/ui/textarea/textarea.ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {auth} from 'utils/redux.utils';
//@ts-check

const Address = (props: any) => {
  // ref
  const addressRef: any = useRef();
  // state
  const [state, setState] = useSetState({
    addressData: [],
    defaultAddress: false,
    selectAddressIndex: null,
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      phone_number: '',
      place: '',
    },
    resolver: zodResolver(Validation.addressScheme),
  });

  const addressPlace = [
    {
      label: 'Home',
      value: 'Home',
      icon: () => (
        <ImageComponent src={Assets.homeOutline} height={20} width={20} svg />
      ),
    },
    {
      label: 'Office',
      value: 'Office',
      icon: () => (
        <ImageComponent src={Assets.officeIcon} height={20} width={20} svg />
      ),
    },
  ];

  const getUser = async () => {
    try {
      setState({loading: true})
      let res: any = await Models.auth.getUser({});
      if (_.isEmpty(res.data.address)) {
        addressRef.current.openModal();
      }
      setState({addressData: res.data?.address,loading: false});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
      setState({loading: false})
    }
  };

  const editAddress = async () => {
    try {
      let query: any = {address: state.addressData};
      const res: any = await Models.auth.addAddress(query);
      auth(res.data);
      props.navigation.goBack();
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const addAddress = async (data?: any) => {
    try {
      setState({loading: true})
      let addressData = state.addressData;
      let query: any = {address: []};
      if (state.defaultAddress) {
        data.default_address = state.defaultAddress;
      }
      if (!_.isEmpty(addressData)) {
        if (state.defaultAddress) {
          let address: any = [];
          addressData.map((item: any) => {
            item.default_address = false;
            address.push(item);
          });
          query.address = address;
        } else {
          query.address = addressData;
        }
      }
      if (!_.isEmpty(query.address[state.selectAddressIndex])) {
        query.address[state.selectAddressIndex] = data;
      } else {
        query.address.unshift(data);
      }
      const res: any = await Models.auth.addAddress(query);
      setState({
        addressData: res.data.address,
        defaultAddress: false,
        selectAddressIndex: null,
        loading: false
      });
      addressRef.current.closeModal();

      reset({
        name: '',
        address: '',
        phone_number: '',
        place: '',
      });
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
      setState({loading: false})
    }
  };

  // hooks
  useEffect(() => {
    getUser();
  }, []);

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
      {state.loading ? 
        <View className="h-[80%]">
          <LottieComponent src={Assets.loader}  />
        </View>:
      <>
      <ScrollViewComponent>
        {!_.isEmpty(state.addressData) &&
          state.addressData?.map((item: any, addIndex: number) => {
            return (
              <View className="pb-2">
                <AddressComponent
                  editAddress={(e: any) => {
                    setState({defaultAddress: true, selectAddressIndex: addIndex});
                    setValue('name', e.name);
                    setValue('address', e.address);
                    setValue('place', e.place);
                    setValue('phone_number', e.phone_number);
                    addressRef.current.openModal();
                  }}
                  data={item}
                  index={addIndex}
                  defaultAddress={(e: any) => {
                    let address = state.addressData;
                    address.map((item: any, index: number) => {
                      if (e === index) {
                        item.default_address = true;
                      } else {
                        item.default_address = false;
                      }
                    });
                    setState({addressData: address});
                  }}
                />
              </View>
            );
          })}
        <TouchableOpacity
          className="flex-row items-center gap-1  pt-2 mx-5"
          activeOpacity={0.7}
          onPress={() => {
            reset({
              name: '',
              address: '',
              phone_number: '',
              place: '',
            });
            addressRef.current.openModal();
          }}>
          <ImageComponent src={Assets.plus} height={18} width={18} svg />
          <Text className="font-merriweather-bold text-[12px]  text-primary-green">
            Add Address
          </Text>
        </TouchableOpacity>
      </ScrollViewComponent>
      <View className="px-5 flex-1 justify-end pb-7">
        <PrimaryButton onPress={editAddress} text={'Set Default Address'} />
        <BottomModal ref={addressRef} height={!_.isEmpty(errors) ? 600 : 520}>
          <View className="px-4">
            <Text className="font-raleway-semi-bold text-[20px] text-secondary-black pt-2 pb-1">
              Address Detail
            </Text>
            <View className="py-5  space-y-4">
              <View>
                <PrimaryInput
                  type="text"
                  placeholder="Billing Name"
                  control={control}
                  name="name"
                />
              </View>
              <View>
                <PrimaryInput
                  type="text"
                  placeholder="Phone Number"
                  control={control}
                  name="phone_number"
                />
              </View>
              <View className="z-10">
                <DropDown
                  name="place"
                  control={control}
                  data={addressPlace}
                  placeholder="Select a Place"
                />
              </View>

              <View className="w-full">
                <TextArea
                  textAreaSize={20}
                  type="text"
                  placeholder="Address"
                  control={control}
                  name="address"
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  setState({defaultAddress: !state.defaultAddress})
                }
                className="flex-row items-center space-x-1 mt-1">
                <ImageComponent
                  svg
                  src={
                    state.defaultAddress
                      ? Assets.checkBoxActive
                      : Assets.checkBoxInActive
                  }
                  height={20}
                  width={20}
                />
                <Text className="font-merriweather-regular text-secondary-black text-xs ">
                  Set As Default Address
                </Text>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              onClick={() => handleSubmit(addAddress)}
              text={'Save Address'}
            />
          </View>
        </BottomModal>
      </View>
      </>}
    </Container>
  );
};

export default Address;
