import {View, Text} from 'react-native';
import React from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  ScrollViewComponent,
} from '../../utils/imports.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const UserScreen = (props: any) => {
  const auth: any = useSelector((state: any) => state.auth.data);
  const userData = [
    {
      name: 'Edit Profile',
      route: 'EditProfile',
      pic: Assets.user,
    },
    {
      name: 'My Address',
      route: 'Address',
      pic: Assets.addressIcon,
    },
    {
      name: 'My Orders',
      route: 'MyOrder',
      pic: Assets.orderIcon,
    },
    {
      name: 'My Wishlist',
      route: 'WishList',
      pic: Assets.wishlistIcon,
    },
    {
      name: 'Notification',
      route: 'NotificationScreen',
      pic: Assets.notification,
    },
    {
      name: 'My Voucher',
      route: 'Voucher',
      pic: Assets.voucherIcon,
    },

    {
      name: 'Reset Password',
      route: 'ResetPassword',
      pic: Assets.resetIcon,
    },
    {
      name: 'Logout',
      route: '',
      pic: Assets.logoutIcon,
    },
  ];
  return (
    <Container>
      <ScrollViewComponent className="">
        <View className="mx-5">
          <View className="justify-center items-center my-5">
            <Text className="font-raleway-semi-bold text-[20px] text-secondary-black">
              Profile
            </Text>
          </View>
          <View className="flex-row space-x-3">
            {!_.isEmpty(auth.profile_pic) ? (
              <ImageComponent
                src={auth.profile_pic}
                height={70}
                width={70}
                radius={100}
              />
            ) : (
              <ImageComponent
                src={Assets.profileIcon}
                height={70}
                width={70}
                svg
              />
            )}
            <View className="mt-1.5 space-y-1">
              <Text className="font-raleway-bold text-[20px] text-secondary-black">
                {auth.username}
              </Text>
              {/* <Text className="font-merriweather-regular text-[14px] text-secondary-black">
              
            </Text> */}
              <Text className="font-merriweather-regular text-[14px] text-secondary-black">
                {auth.email}
              </Text>
            </View>
          </View>
          <View className=" my-5">
            <Text className="font-raleway-semi-bold text-[20px] text-secondary-black">
              Account Settings
            </Text>
          </View>
          <View className="space-y-3">
            {userData.map((item: any, index: number) => (
              <TouchableOpacity
                className="bg-btn-white  px-4 h-[60px] flex-row items-center justify-between rounded-lg"
                onPress={() => props.navigation.navigate(item.route)}
                activeOpacity={0.7}
                key={index}>
                <View className=" flex-row space-x-5 items-center">
                  <ImageComponent src={item.pic} svg height={24} width={24} />
                  <Text className="font-raleway-bold text-base text-secondary-black">
                    {item.name}
                  </Text>
                </View>
                <ImageComponent
                  src={Assets.arrowRight}
                  height={24}
                  width={24}
                  svg
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollViewComponent>
    </Container>
  );
};

export default UserScreen;
