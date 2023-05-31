import {View, Text} from 'react-native';
import React from 'react';
import {Rating} from 'react-native-ratings';

interface IRatingComponent{
  RatingValue:number
}

const RatingComponent = (props:IRatingComponent) => {
  return (
    <View>
      <Rating
        type="custom"
        ratingColor="#FFD12E"
        ratingBackgroundColor="#DADDD8"
        ratingCount={5}
        imageSize={24}
        startingValue={props.RatingValue&&props.RatingValue/20}
        onFinishRating={() => 120}
        style={{paddingVertical: 10}}
        readonly
      />
    </View>
  );
};

export default RatingComponent;
