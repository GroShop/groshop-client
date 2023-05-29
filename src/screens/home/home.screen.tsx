import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  FilterSlider,
  ImageComponent,
  ImageSlider,
  SearchInput,
} from 'utils/imports.utils';
import {useForm} from 'react-hook-form';
import Slider from 'components/slider/slider';

const HomeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      filterProduct: '',
    },
  });
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-[90%] mx-[auto] "
        style={{height: '100%'}}>
        <View className="items-center flex-row justify-between py-4 ">
          <View>
            <Text className="font-raleway-semi-bold text-2xl text-secondary-black ">
              Hello Sharon
            </Text>
            <Text className="font-raleway-semi-bold text-sm  text-secondary-black">
              what would you buy today
            </Text>
          </View>
          <ImageComponent src={Assets.userIcon} svg height={36} width={36} />
        </View>
        <View className='py-2 ' >
          <SearchInput
            name="filterProduct"
            type="text"
            placeholder="Search anything here"
            control={control}
          />
        </View>
        <View className='flex-row items-center justify-between py-3  '>
          <View className='flex-col items-center w-[48px]  space-y-1 '>
            <View className={`border-[2px]  w-full border-input-bg h-[48px] items-center  justify-center rounded-lg`} >
              <ImageComponent src={Assets.productIcon} height={42} width={42} svg/>
            </View>
            <Text className='font-merriweather-regular text-[11px] text-secondary-black'>Fruit</Text>
          </View>
          <View className='flex-col items-center w-[48px]  space-y-1 '>
            <View className={`border-[2px]  w-full border-input-bg h-[48px] items-center  justify-center rounded-lg`} >
              <ImageComponent src={Assets.productIcon} height={42} width={42} svg/>
            </View>
            <Text className='font-merriweather-regular text-[11px] text-secondary-black'>Fruit</Text>
          </View>
          <View className='flex-col items-center w-[48px]  space-y-1 '>
            <View className={`border-[2px]  w-full border-input-bg h-[48px] items-center  justify-center rounded-lg`} >
              <ImageComponent src={Assets.productIcon} height={42} width={42} svg/>
            </View>
            <Text className='font-merriweather-regular text-[11px] text-secondary-black'>Fruit</Text>
          </View>

          <View className='flex-col items-center w-[48px]  space-y-1 '>
            <View className={`border-[2px]  w-full border-input-bg h-[48px] items-center  justify-center rounded-lg`} >
              <ImageComponent src={Assets.productIcon} height={42} width={42} svg/>
            </View>
            <Text className='font-merriweather-regular text-[11px] text-secondary-black'>Fruit</Text>
          </View>
          <View className='flex-col items-center w-[48px]  space-y-1 '>
            <View className={`border-[2px]  w-full border-input-bg h-[48px] items-center  justify-center rounded-lg`} >
              <ImageComponent src={Assets.productIcon} height={42} width={42} svg/>
            </View>
            <Text className='font-merriweather-regular text-[11px] text-secondary-black'>Fruit</Text>
          </View>
        
        </View>
        <View className='w-full items-center justify-center '>
          <ImageComponent src={Assets.promotions} height={150}  svg/>
          {/* <Slider/> */}
      {/* <ImageSlider/> */}
        </View>
        <View className='w-full items-center justify-center py-5'>
          <FilterSlider/>
        </View>
        <View className='w-full items-center justify-center '>
          
        </View>
      </ScrollView>

    </Container>
    
  );
};

export default HomeScreen;
