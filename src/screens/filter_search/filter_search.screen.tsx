import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  Assets,
  CategoriesComponent,
  Container,
  ImageComponent,
  LottieComponent,
  PrimaryInput,
  ProductCard,
  ScrollViewComponent,
} from '../../utils/imports.utils';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import Models from '../../imports/models.imports';
import {Failure, useSetState} from '../../utils/functions.utils';
import _ from 'lodash';
import {useIsFocused} from '@react-navigation/native';

const FilterSearch = (props: any) => {
  const auth: any = useSelector((state: any) => state.auth.data);

  // navigation
  const isFocused = useIsFocused();
  const [state, setState] = useSetState({
    productData: [],
    lastProductData: {},
    loading: false,
    product_loader: false,
  });
  const {
    control,
    resetField,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      filterSearch: '',
    },
  });

  const getManyProduct = async () => {
    try {
      setState({product_loader: true});
      let query = {
        search: watch().filterSearch,
      };
      let res: any = await Models.product.getManyProduct(query);
      setState({productData: res.data, product_loader: false});
    } catch (error: any) {
      console.log('error', error);
    }
  };
  const createSearchProduct = async (_id: string, name: string) => {
    try {
      let query = {
        search_product: _id,
      };
      props.navigation.navigate(`ProductScreen`, {product_id: _id});
      await Models.searchProduct.createSearchProduct(query);
    } catch (error: any) {
      console.log('error', error);
    }
  };
  const deleteSearchProduct = async (_id: string) => {
    try {
      let query = {
        search_product: _id,
      };
      let res: any = await Models.searchProduct.editSearchProduct(query);
      setState({lastProductData: res.data});
    } catch (error: any) {
      console.log('error', error);
    }
  };
  const getManySearchProduct = async () => {
    try {
      setState({loading: true});
      let res: any = await Models.searchProduct.getSearchProduct({});
      setState({lastProductData: res.data, loading: false});
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };
  useEffect(() => {
    if (!_.isEmpty(watch().filterSearch)) {
      getManyProduct();
    } else {
      setState({productData: []});
    }
  }, [watch().filterSearch]);
  useEffect(() => {
    getManySearchProduct();
    if (isFocused) {
      resetField('filterSearch');
    }
  }, [isFocused]);

  return (
    <Container loading={state.loading} lottie={Assets.loader}>
      <View className=" mt-3">
        <View className="flex-row items-center justify-between py-3  px-5">
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
              <PrimaryInput
                name="filterSearch"
                control={control}
                type="text"
                placeholder="Search"
              />
            </View>
          </View>
          <View className="w-[20%]  items-end">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('FilterProduct')}
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
        {_.isEmpty(watch().filterSearch) ? (
          <View className="px-5">
            {!_.isEmpty(state.lastProductData.product) && (
              <View>
                <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
                  Last Seen
                </Text>
                <CategoriesComponent
                  data={state.lastProductData.product}
                  type={'filterSearch'}
                  onPress={(value: string) => {
                    props.navigation.navigate(`ProductScreen`, {
                      product_id: value,
                    });
                  }}
                />
              </View>
            )}
            {!_.isEmpty(state.lastProductData.search_product) && (
              <View>
                <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
                  Last Search
                </Text>
                <ScrollViewComponent>
                  {state.lastProductData.search_product.map(
                    (item: any, index: number) => (
                      <View className="flex-row justify-between space-y-0.5">
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            props.navigation.navigate(`ProductScreen`, {
                              product_id: item._id,
                            })
                          }>
                          <Text className="font-merriweather-regular text-sm text-text-gray">
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className=""
                          onPress={() => deleteSearchProduct(item._id)}
                          activeOpacity={0.7}>
                          <ImageComponent
                            src={Assets.closeIcon}
                            height={28}
                            width={28}
                            svg
                          />
                        </TouchableOpacity>
                      </View>
                    ),
                  )}
                </ScrollViewComponent>
              </View>
            )}
          </View>
        ) : state.product_loader ? (
          <View className="">
            <LottieComponent
              src={Assets.product_loader}
              height={80}
              width={80}
            />
          </View>
        ) : !_.isEmpty(state.productData) ? (
          <ScrollViewComponent className="bg-product-gray">
            <View className="w-full flex-row justify-between flex-wrap px-5">
              <ProductCard
                {...props}
                data={state.productData}
                type={'filterSearch'}
                onPress={createSearchProduct}
              />
            </View>
          </ScrollViewComponent>
        ) : (
          <View className="w-full h-[80%] justify-center items-center">
            <Text className="font-merriweather-bold text-lg text-text-gray">
              No Data Found
            </Text>
          </View>
        )}
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

export default FilterSearch;
