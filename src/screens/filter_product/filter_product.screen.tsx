import {View, Text, TouchableOpacity} from 'react-native';
import {
  Assets,
  CategoriesComponent,
  Container,
  ImageComponent,
  PrimaryButton,
} from '../../utils/imports.utils';
import {Failure, useSetState} from '../../utils/functions.utils';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
// @ts-ignore
import Slider from 'react-native-slider';
import _ from 'lodash';
import Models from '../../imports/models.imports';
import {filterProduct} from '../../utils/redux.utils';

const FilterProduct = (props: any) => {
  // state
  const [state, setState] = useSetState({
    categories: '',
    tag: '',
    rating: {},
    max_price: 200,
  });

  let tags = [
    'All',
    'Flash Sale',
    'Discount',
    'Best offer',
    'Buy Again',
    'New',
  ];

  let ratings = [
    {name: '2 or higher', min_rating: 20, max_rating: 40},
    {name: '4 or higher', min_rating: 60, max_rating: 80},
    {name: '3 or higher', min_rating: 40, max_rating: 60},
    {name: '5 star only', min_rating: 80, max_rating: 100},
  ];

  const getManyProduct = async () => {
    try {
      let query: any = {
        min_price: 1,
        max_price: state.max_price,
      };
      if (!_.isEmpty(state.rating)) {
        query.min_rating = state.rating.min_rating;
        query.max_rating = state.rating.max_rating;
      }
      if (!_.isEmpty(state.categories)) {
        query.categories = state.categories;
      }
      if (!_.isEmpty(state.tag)) {
        query.tag = state.tag;
      }
      let res: any = await Models.product.getManyProduct(query);
      props.navigation.navigate('Categories');
      filterProduct(res.data.docs);
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const handleSlider = (data: any, check: string) => {
    if (check === 'rating') {
      if (data.name === state.rating.name) {
        setState({rating: ''});
      } else {
        setState({rating: data});
      }
    } else {
      if (data.item === state.tag) {
        setState({tag: ''});
      } else {
        setState({tag: data.item});
      }
    }
  };

  return (
    <Container>
      <View className="w-[90%] mx-auto " style={{height: '100%'}}>
        <View className="items-center flex-row py-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.goBack()}
            className="">
            <ImageComponent src={Assets.backIcon} height={24} width={24} svg />
          </TouchableOpacity>
          <View className="items-center w-[90%] ">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[10px]">
              Filter
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-raleway-semi-bold text-xl text-secondary-black pb-3">
            Categories
          </Text>
          <View className="py-1 pb-2">
            <CategoriesComponent
              onPress={(value: any) => setState({categories: value})}
            />
          </View>
        </View>
        <View>
          <Text className="font-raleway-semi-bold text-xl text-secondary-black pb-3">
            Trending
          </Text>
          <View className="py-1">
            <FlatList
              data={tags}
              renderItem={(data: any, index: number) => (
                <TouchableOpacity
                  className={`mr-4  ${
                    data.item === state.tag
                      ? ' border-primary-green bg-primary-green'
                      : 'border-text-gray'
                  } rounded-lg px-4 py-[6px] border-2  `}
                  onPress={() => handleSlider(data, 'tag')}
                  activeOpacity={0.7}
                  key={index}>
                  <Text
                    className={` text-[12px] ${
                      data.item === state.tag
                        ? 'text-neutral-white font-merriweather-bold'
                        : 'text-text-gray font-merriweather-regular'
                    } `}>
                    {data.item}
                  </Text>
                </TouchableOpacity>
              )}
              horizontal
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View>
          <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
            Price
          </Text>
          <View className="py-1 flex-row items-center justify-between">
            <View className="w-[120px] border-text-gray border-2  items-center justify-center py-[7px] rounded-lg">
              <Text
                className={` text-base font-merriweather-bold text-secondary-black items-center
                      mr-2
                     `}>
                ₹ 1
              </Text>
            </View>
            <View className=" ">
              <Text className="font-merriweather-regular text-secondary-black text-[14px] ">
                to
              </Text>
            </View>
            <View className="w-[120px] border-text-gray border-2  items-center justify-center py-[7px] rounded-lg ">
              <Text
                className={` text-base font-merriweather-bold text-secondary-black items-center
                      mr-2
                     `}>
                ₹ {state.max_price}
              </Text>
            </View>
          </View>
          <Slider
            minimumValue={1}
            maximumValue={200}
            minimumTrackTintColor="#689C36"
            thumbStyle={{
              width: 20,
              height: 20,
              borderRadius: 60 / 2,
              backgroundColor: '#689C36',
              borderColor: '#D7F4BB',
              borderWidth: 3,
            }}
            value={state.max_price}
            onValueChange={(value: any) => {
              setState({max_price: Math.round(value)});
            }}
          />
        </View>
        <View>
          <Text className="font-raleway-semi-bold text-xl text-secondary-black py-3">
            Rating
          </Text>
          <View className=" flex-row flex-wrap ">
            {ratings.map((item, index: number) => (
              <TouchableOpacity
                className={` mr-4 mb-4 ${
                  item.name === state.rating.name
                    ? ' border-primary-green bg-primary-green'
                    : 'border-text-gray'
                } rounded-lg px-4 py-[6px] border-2  flex-row items-center space-x-2 w-[130px]`}
                onPress={() => handleSlider(item, 'rating')}
                activeOpacity={0.7}
                key={index}>
                <ImageComponent src={Assets.star} height={24} width={24} svg />
                <Text
                  className={` text-[12px] ${
                    item.name === state.rating.name
                      ? 'text-neutral-white font-merriweather-bold'
                      : 'text-text-gray font-merriweather-regular'
                  } `}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="flex-row items-end justify-between flex-1 mb-7">
          <PrimaryButton
            btnStyle="bg-light-mode border-[1px] border-primary-green  w-[156px] h-[45px]"
            btnText="text-primary-green "
            iconHeight={18}
            iconWidth={18}
            text={'Cancel'}
          />
          <PrimaryButton
            btnStyle="bg-primary-green w-[156px] h-[45px]"
            onPress={getManyProduct}
            text={'Show Results'}
          />
        </View>
      </View>
    </Container>
  );
};

export default FilterProduct;
