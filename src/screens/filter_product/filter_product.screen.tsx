import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  Input,
  InviteModal,
  PrimaryButton,
  Validation,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Failure,
  Ratio,
  Success,
  useSetState,
} from '../../utils/functions.utils';
import {Models} from '../../imports/models.imports';
import {auth} from '../../utils/redux.utils';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import Slider from 'react-native-slider';

const FilterProduct = (props: any) => {
  // ref
  const resetRef: any = useRef();

  // redux
  const auth: any = useSelector((state: any) => state.auth.data);

  // state
  const [state, setState] = useSetState({
    passwordIcon: true,
    confirmPasswordIcon: true,
    privacyPolicy: false,
    value: 0,
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

  let slides = [
    'All',
    'Flash Sale',
    'Discount',
    'Best offer',
    'Buy Again',
    'New',
  ];
  const handleSlider = (data: any) => {
    setState({active: data.item});
  };
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-[90%] mx-auto "
        style={{height: '100%'}}>
        <View className="items-center flex-row py-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.goBack()}
            className="">
            <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
          </TouchableOpacity>
          <View className="items-center w-[90%] ">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
              Reset Password
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
            Categories
          </Text>
          <View className="py-1">
            <FlatList
              data={slides}
              renderItem={(item: any, index: number) => (
                <TouchableOpacity
                  className={`mr-4  ${
                    item.item === state.active
                      ? ' border-primary-green bg-primary-green'
                      : 'border-text-gray'
                  } rounded-lg px-4 py-[6px] border-2  `}
                  onPress={() => handleSlider(item)}
                  activeOpacity={0.7}>
                  <Text
                    className={` text-[12px] ${
                      item.item === state.active
                        ? 'text-neutral-white font-merriweather-bold'
                        : 'text-text-gray font-merriweather-regular'
                    } `}>
                    {item.item}
                  </Text>
                </TouchableOpacity>
              )}
              horizontal
              // pagingEnabled
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              // onViewableItemsChanged={handleViewableItemsChanged}
              // viewabilityConfig={handleviewabilityConfig}
              // onScroll={handleScroll}
            />
          </View>
        </View>
        <View>
          <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
            Price
          </Text>
          <View className="py-1 flex-row items-center justify-between">
            <View className="w-[120px] ">
              <Input
                name="min_price"
                control={control}
                inputWrapperStyle="bg-light-mode border-2 h-[40px] border-text-gray px-5"
                keyboardType={'numeric'}
              />
            </View>
            <View className=" ">
              <Text className="font-merriweather-regular text-secondary-black text-[14px] ">
                to
              </Text>
            </View>
            <View className="w-[120px] ">
              <Input
                name="max_price"
                control={control}
                inputWrapperStyle="bg-light-mode border-2 h-[40px] border-text-gray px-2"
                keyboardType={'numeric'}
              />
            </View>
          </View>
        <Slider
          minimumTrackTintColor="#689C36"
          thumbStyle={{
            width: 20,
            height: 20,
            borderRadius: 60 / 2,
            backgroundColor: '#689C36',
            borderColor: '#D7F4BB',
            borderWidth: 3,
          }}
          value={state.value}
          onValueChange={(value: any) => {
            setState({value});
          }}
        />
        </View>
        <View>
          <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
          Rating
          </Text>
          </View>
        <View className="pt-9">
          <PrimaryButton
            // onClick={() => handleSubmit(handleFilterProduct)}
            text={'Reset Password'}
          />
          <InviteModal ref={resetRef} type={'FilterProduct'} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default FilterProduct;
