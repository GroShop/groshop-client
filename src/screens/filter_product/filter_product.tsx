import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {
  Assets,
  CategoriesComponent,
  Container,
  FilterSearch,
  ImageComponent,
  Input,
  ProductCard,
} from 'utils/imports.utils';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';

const FilterProduct = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      filterProduct: '',
    },
  });
  const data = [
    'Orange',
    'Guvi',
    'Apple',
    'Mango',
    'Veel',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];
  return (
    <Container>
      <View className="p-[20px] ">
        <View className="flex-row items-center justify-between  h-[10%] ">
          <View className="w-[80%] flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.goBack()}
              className="w-[13%]">
              <ImageComponent
                src={Assets.backIcon}
                svg
                height={24}
                width={24}
              />
            </TouchableOpacity>
            <View className="w-[87%] mx-auto">
              <Input
                name="filter_product"
                control={control}
                type="text"
                placeholder="Search"
              />
            </View>
          </View>
          <View className="w-[20%]  items-end">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.goBack()}
              className="w-[56px] h-[56px] items-center bg-primary-green justify-center rounded-[10px]">
              <ImageComponent
                src={Assets.filterIcon}
                height={24}
                width={24}
                svg
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="h-[90%]">
          <View>
            <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
              Last Seen
            </Text>
            <CategoriesComponent />
          </View>
          <View>
            <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
              Last Search
            </Text>

            <FilterSearch />
          </View>
        </View>
        {/* <View className=" h-[8%]  justify-center">
          <Text className="font-raleway-semi-bold text-xl text-secondary-black ">
            Result for : Fruit
          </Text>
        </View> */}
        {/* <View className="h-[82%]">
          <FlatList
          className='h-full'
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}
            contentContainerStyle={{paddingBottom: 20}}
            data={data}
            renderItem={(item: any) => <ProductCard />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.id}
          />
        </View> */}
      </View>
    </Container>
  );
};

export default FilterProduct;
