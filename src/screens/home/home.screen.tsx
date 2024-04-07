import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {
  Assets,
  CategoriesComponent,
  Container,
  FilterSlider,
  ImageComponent,
  ImageSlider,
  LottieComponent,
  ProductCard,
  ScrollViewComponent,
  SearchInput,
} from '../../utils/imports.utils';
import Models from '../../imports/models.imports';
import {Failure, useSetState} from '../../utils/functions.utils';
import {auth} from '../../utils/redux.utils';
import _ from 'lodash';

const HomeScreen = (props: any) => {
  const [state, setState] = useSetState({
    allProductData: [],
    user: {},
    categories: '',
    tags: '',
    loading: false,
  });
  // redux
  // const auth:any = useSelector((state:any)=>{state.auth.data})
  let slides = [Assets.productIcon, Assets.productIcon, Assets.productIcon];
  const getManyProduct = async (data?: string, key?: string) => {
    try {
      setState({loading: true});
      let query: any = {};
      if (!_.isEmpty(state.categories)) {
        query.categories = state.categories;
      }
      if (!_.isEmpty(state.tags)) {
        query.tag = state.tags;
      }
      let res: any = await Models.product.getManyProduct(query);
      
      setState({allProductData: res.data, loading: false});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
      setState({loading: false});
    }
  };

  const getUser = async () => {
    try {
      let res: any = await Models.auth.getUser({});
      setState({user: res.data});
      auth(res.data);
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getManyProduct();
  }, [state.categories, state.tags]);
  let productFilter = [
    'All',
    'Flash Sale',
    'Discount',
    'Best offer',
    'Buy Again',
    'New',
  ];

  return (
    <Container>
      <ScrollViewComponent>
        <View className="items-center flex-row justify-between py-4 px-[20px] ">
          <View>
            <Text className="font-raleway-semi-bold text-2xl text-secondary-black ">
              Hello {state.user?.username}
            </Text>
            <Text className="font-raleway-semi-bold text-sm  text-secondary-black">
              what would you buy today
            </Text>
          </View>
          {!_.isEmpty(state.user?.profile_pic) ? (
            <ImageComponent
              src={state.user?.profile_pic}
              height={36}
              width={36}
              radius={100}
            />
          ) : (
            <ImageComponent src={Assets.userIcon} height={36} width={36} svg />
          )}
          {/* <ImageComponent src={Assets.userIcon} svg height={36} width={36} /> */}
        </View>
        <View className="py-2 px-[20px]">
          <SearchInput
            name="filterProduct"
            placeholder="Search anything here"
            onPress={() => props.navigation.navigate('FilterSearch')}
          />
        </View>
        <View className="px-[20px] py-4">
          <CategoriesComponent
            onPress={(value: any) => setState({categories: value})}
          />
        </View>
        <View className="h-[160px]">
          <ImageSlider data={slides} />
        </View>
        <View className="w-full items-center justify-center p-5 ">
          <FilterSlider
            onPress={(value: any) => setState({tags: value})}
            data={productFilter}
            active="All"
          />
        </View>
        {state.loading ? (
          <View className="flex-1">
            <LottieComponent
              src={Assets.product_loader}
              height={80}
              width={80}
            />
          </View>
        ) : !_.isEmpty(state.allProductData) ? (
          <View className="w-full flex-row justify-between flex-wrap px-5 ">
            <ProductCard {...props} data={state.allProductData} />
          </View>
        ) : (
          <View className="w-full mt-[80px]  justify-center items-center">
            <Text className="font-merriweather-bold text-lg text-text-gray">
              No Data Found
            </Text>
          </View>
        )}
      </ScrollViewComponent>
    </Container>
  );
};

export default HomeScreen;
