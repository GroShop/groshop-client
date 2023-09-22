import {View} from 'react-native';
import React from 'react';
import {Rating} from 'react-native-ratings';
import {useSetState} from '../../utils/functions.utils';

interface IRatingComponent {
  RatingValue?: number;
  readonly?: boolean;
  imageSize?: number;
  onClick?: any;
}

const RatingComponent = (props: IRatingComponent) => {

  const [state, setState] = useSetState({
    rating: props.RatingValue || 0,
  });
  return (
    <View className='w-full'>
    <Rating
      type="custom"
      ratingColor="#FFD12E"
      ratingBackgroundColor="#DADDD8"
      ratingCount={5}
      imageSize={props.imageSize}
      startingValue={state.rating}
      onStartRating={(e: any) => {
        props.onClick(e);
        setState({rating: e});
      }}
      readonly={props.readonly ? true : false}
    />
   </View>
  );
};

export default RatingComponent;
