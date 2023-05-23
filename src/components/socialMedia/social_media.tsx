import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Assets from '../../imports/assets.imports';
import {ImageComponent} from '../../utils/imports.utils';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useSetState} from 'utils/functions.utils';
import {assets} from '../../../react-native.config';

GoogleSignin.configure({
  // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '669942531839-daljlkoup7lrc25533rhv29o19vcq5m9.apps.googleusercontent.com',
});
const SocialMedia = () => {
  const [state, setState] = useSetState({
    user: {},
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setState({user: userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('progress already');

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');

        // play services not available or outdated
      } else {
        console.log('err', error);

        // some other error happened
      }
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className=" w-[100%] h-12 bg-btn-white rounded-lg  items-center flex-row  space-x-5"
      onPress={signIn}>
      <View className="w-[29%] items-end ">
        <ImageComponent src={Assets.googleIcon} height={24} width={24} />
      </View>
      <View className="w-[69%] ">
        <Text className="font-merriweather-bold text-[14px] text-verify">
          Sign in with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialMedia;
