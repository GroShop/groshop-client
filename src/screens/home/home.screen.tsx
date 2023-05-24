import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  SearchInput,
} from 'utils/imports.utils';
import {useForm} from 'react-hook-form';

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
        className="w-[90%] mx-auto"
        style={{height: '100%'}}>
        <View className="items-center flex-row justify-between py-4 ">
          <View>
            <Text className="font-raleway-semi-bold text-2xl text-secondary-black">
              Hello Sharon
            </Text>
            <Text className="font-raleway-semi-bold text-sm  text-secondary-black">
              what would you buy today
            </Text>
          </View>
          <ImageComponent src={Assets.userIcon} svg height={36} width={36} />
        </View>
        <View className='py-2'>
          <SearchInput
            name="filterProduct"
            type="text"
            placeholder="Search anything here"
            control={control}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
