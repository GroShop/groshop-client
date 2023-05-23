import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect} from 'react';
import Assets from '../../imports/assets.imports';
import {ImageComponent} from '../../utils/imports.utils';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useSetState} from 'utils/functions.utils';
import auth from '@react-native-firebase/auth';

const SocialMedia = () => {
  const [state, setState] = useSetState({
    user: {},
  });

  useEffect(() => {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        webClientId:
          '669942531839-os77ero5mh54ue63jhg4k4otqlmagqnf.apps.googleusercontent.com',
      });
    } else {
      GoogleSignin.configure({
        webClientId:
          '669942531839-daljlkoup7lrc25533rhv29o19vcq5m9.apps.googleusercontent.com',
      });
    }
  }, []);

  const signInIos = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userInfo = auth().signInWithCredential(googleCredential);
      userInfo
        .then(userInfo => {
          console.log('user', userInfo);
          setState({user: userInfo});
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error: any) {
      console.log('err', error);
    }
  };

  const signInAndroid = async () => {
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
      onPress={Platform.OS === 'ios' ? signInIos : signInAndroid}>
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
