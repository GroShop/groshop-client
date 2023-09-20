import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  Assets,
  BottomModal,
  Container,
  ImageComponent,
  InviteModal,
  PrimaryButton,
  PrimaryInput,
  ScrollViewComponent,
  Validation,
} from 'utils/imports.utils';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {Failure, Success, imgToUrl, useSetState} from 'utils/functions.utils';
import _ from 'lodash';
import Models from 'imports/models.imports';
import {auth} from 'utils/redux.utils';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSelector} from 'react-redux';
const EditProfile = (props: any) => {
  // ref
  const profileRef: any = useRef();

  // redux
  const user: any = useSelector((state: any) => state.auth.data);

  //  state
  const [state, setState] = useSetState({
    profilePic: '',
    email: '',
  });

  // local data
  const profileData: any = [
    {
      name: 'Camera',
      pic: Assets.uploadCamera,
    },
    {
      name: 'Gallery',
      pic: Assets.galleryIcon,
    },
  ];

  const cameraHandel = (permission: any) => {
    request(permission).then(async result => {
      if (result === RESULTS.GRANTED) {
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          cropping: true,
          mediaType: 'photo',
        }).then(async image => {
          let img: any = await imgToUrl(image);
          setState({profilePic: img.url});
          profileRef.current.closeModal();
        });
      }
    });
  };

  const galleryHandel = (permission: any) => {
    request(permission).then(async result => {
      if (result === RESULTS.GRANTED) {
        ImagePicker.openPicker({
          mediaType: 'photo',
          width: 500,
          height: 500,
          cropping: true,
        }).then(async image => {
          let img: any = await imgToUrl(image);
          setState({profilePic: img.url});
          profileRef.current.closeModal();
        });
      }
    });
  };

  const editProfile = async (data: any) => {
    try {
      let query: any = {
        username: data.username,
      };
      if (!_.isEmpty(data.phone_number)) {
        query.phone_number = data.phone_number;
      }
      if (!_.isEmpty(state.profilePic)) {
        query.profile_pic = state.profilePic;
      }
      const res: any = await Models.auth.editUser(query);
      Success('Profile updated successfully');
      auth(res.data);
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      phone_number: '',
      username: '',
    },
    resolver: zodResolver(Validation.profileScheme),
  });

  // hooks
  useEffect(() => {
    // update profile
    if (!_.isEmpty(user)) {
      setValue('username', user.username);
      setState({email: user.email});
      if (!_.isEmpty(user.phone_number)) {
        setValue('phone_number', user.phone_number);
      }
      if (!_.isEmpty(user.profile_pic)) {
        setState({profilePic: user.profile_pic});
      }
    }
  }, [user]);

  return (
    <Container>
      <View className="mx-[20px] h-full">
        <ScrollViewComponent>
          <View className="items-center flex-row justify-center my-6">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.goBack()}
              className="">
              <ImageComponent
                src={Assets.backIcon}
                height={24}
                width={24}
                svg
              />
            </TouchableOpacity>
            <View className="items-center w-[90%] ">
              <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[15px]">
                Edit Profile
              </Text>
            </View>
          </View>
          <View className="w-full items-center justify-center relative my-3">
            <TouchableOpacity
              className="flex-row space-x-3"
              onPress={() => {
                profileRef.current.openModal();
              }}>
              {!_.isEmpty(state.profilePic) ? (
                <ImageComponent
                  src={state.profilePic}
                  height={110}
                  width={110}
                  radius={100}
                />
              ) : (
                <ImageComponent
                  src={Assets.profileIcon}
                  height={110}
                  width={110}
                  svg
                />
              )}
              <View className="bg-primary-green w-[32px] h-[32px] rounded-full items-center justify-center  absolute bottom-0 right-1">
                <ImageComponent
                  src={Assets.cameraIcon}
                  height={24}
                  width={24}
                  svg
                />
              </View>
            </TouchableOpacity>
            <InviteModal
              ref={profileRef}
              type="uploadProfile"
              data={profileData}
              onPress={(item: string) => {
                if (item === 'Camera') {
                  if (Platform.OS === 'ios') {
                    cameraHandel(PERMISSIONS.IOS.CAMERA);
                  } else {
                    cameraHandel(PERMISSIONS.ANDROID.CAMERA);
                  }
                } else {
                  if (Platform.OS === 'ios') {
                    galleryHandel(PERMISSIONS.IOS.PHOTO_LIBRARY);
                  } else {
                    galleryHandel(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                  }
                }
              }}
            />
            <View className="space-y-4 my-8">
              <View>
                <PrimaryInput
                  type="text"
                  placeholder="Full Name"
                  control={control}
                  name="username"
                />
              </View>
              <View className="flex-row items-center justify-between px-2.5 bg-input-bg h-14 rounded-lg ">
                <Text className="text-secondary-black font-merriweather-semibold text-[14px]">
                  {state.email}
                </Text>
              </View>
              <View>
                <PrimaryInput
                  type="text"
                  placeholder="Phone Number"
                  control={control}
                  name="phone_number"
                />
              </View>
            </View>
          </View>
        </ScrollViewComponent>
        <View className="flex-1 justify-end pb-6">
          <PrimaryButton
            onClick={() => handleSubmit(editProfile)}
            text={'Save'}
          />
        </View>
      </View>
    </Container>
  );
};

export default EditProfile;
