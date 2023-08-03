import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Assets, ImageComponent} from 'utils/imports.utils';
import {useSetState} from 'utils/functions.utils';

interface IFilterSearch {
  searchData?: any;
}

const FilterSearch = (props: IFilterSearch) => {
  const [state, setState] = useSetState({
    product: '',
  });
  const filterSearch = [
  "Orange","Guvi","Apple","Mango","Veel"
  ];  

  return (
    <ScrollView className="w-full">
      {filterSearch.map((item: any, index: number) => (
        <TouchableOpacity
          className="flex-row justify-between"
          onPress={() => setState({product: index})}
          activeOpacity={0.7}>
          <Text className="font-merriweather-regular text-sm text-text-gray">
            {item}
          </Text>
          <TouchableOpacity
            className=""
            onPress={() => setState({product: index})}
            activeOpacity={0.7}>
            <ImageComponent src={Assets.closeIcon} height={28} width={28} svg />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterSearch;
