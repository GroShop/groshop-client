import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Assets from '../../imports/assets.imports';
import {ImageComponent} from '../../utils/imports.utils';

const SocialMedia = () => {
  let media: any = [
    {
      name: 'Facebook',
      img: Assets.facebookIcon,
    },
    {
      name: 'Google',
      img: Assets.googleIcon,
    },
    {
      name: 'Apple',
      img: Assets.appleIcon,
    },
  ];
  return (
    <View className="flex-row justify-center space-x-10 ">
      {media.map((item: any,index:number) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-10 w-10 bg-btn-white rounded-full justify-center items-center " key={index}>
            <ImageComponent src={item.img} height={26} width={26} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SocialMedia