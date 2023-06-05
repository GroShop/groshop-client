import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  Assets,
  CategoriesComponent,
  Container,
  FilterSlider,
  ImageComponent,
  ImageSlider,
  ProductCard,
  SearchInput,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';

const HomeScreen = (props:any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      filterProduct: '',
    },
  });


    let slides = [
       Assets.promotions,
       Assets.promotions,
       Assets.promotions,
  ];
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full "
        style={{height: '100%' }}>
        <View className="items-center flex-row justify-between py-4 px-[20px] ">
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
        <View className="py-2 px-[20px]">
          <SearchInput
            name="filterProduct"
            type="text"
            placeholder="Search anything here"
            control={control}
            onPress={()=>props.navigation.navigate('FilterSearch')}
          />
        </View>
       <View className='px-[20px] py-4'>
        <CategoriesComponent/>
       </View>
        <View className="w-full items-center justify-center ">
          <ImageSlider height={150} imageData={slides} />
        </View>
        <View className="w-full items-center justify-center p-5 ">
          <FilterSlider />
        </View>
        <View className="w-full flex-row justify-between px-[20px]">
          <ProductCard {...props}/>
          <ProductCard />
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
