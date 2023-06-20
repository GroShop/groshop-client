import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
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
import {Models} from 'imports/models.imports';
import {Failure, useSetState} from 'utils/functions.utils';

const HomeScreen = (props: any) => {
  const [state, setState] = useSetState({
    allProduct: [],
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      filterProduct: '',
    },
  });

  let slides = [Assets.productIcon, Assets.productIcon, Assets.productIcon];
  const getManyProduct = async () => {
    try {
      let res: any = await Models.product.getManyProduct({});
      console.log(typeof res.data)
      setState({allProduct: res.data.docs});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };
  useEffect(() => {
    getManyProduct();
  }, []);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full "
        style={{height: '100%'}}>
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
            onPress={() => props.navigation.navigate('FilterSearch')}
          />
        </View>
        <View className="px-[20px] py-4">
          <CategoriesComponent />
        </View>
        <View className="h-[160px]">
          <ImageSlider data={slides} />
        </View>
        <View className="w-full items-center justify-center p-5 ">
          <FilterSlider />
        </View>
        <View className="w-full flex-row justify-between flex-wrap px-5 ">
          <ProductCard {...props}  data={state.allProduct}/>
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
