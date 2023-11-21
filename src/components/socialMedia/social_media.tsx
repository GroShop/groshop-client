import {View, Text, TouchableOpacity, Platform, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Assets from '../../imports/assets.imports';
import {ImageComponent} from '../../utils/imports.utils';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Failure, Success, useSetState} from '../../utils/functions.utils';
import auth from '@react-native-firebase/auth';
import Models from '../../imports/models.imports';
import {socialLogIn} from '../../utils/constant.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotificationToken } from 'utils/notification.utils';

const SocialMedia = (props: any) => {
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
      // const notificationToken= await getNotificationToken()
      let query: any = {
        social_account_type: socialLogIn.GOOGLE,
        // notification_token:notificationToken
      };

      await userInfo
        .then(userInfo => {
          query.email = userInfo.user.email;
          query.username = userInfo.user.displayName;
        })
        .catch(error => {
          console.log(error);
        });
      let res: any = await Models.auth.socialSignIn(query);
      await AsyncStorage.setItem('token', res.token);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
      });
      Success(res.message);
      const createChat:any= await Models.chat.createChat({
        users:[ res.data._id,"646489865d00e663e8ff5eeb"]
      })
      await AsyncStorage.setItem('chat', createChat.data._id);
    } catch (error: any) {
      console.log('err', error);
      Failure(error.message);
    }
  };

  const signInAndroid = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const notificationToken= await getNotificationToken()
      
      let query: any = {
        social_account_type: socialLogIn.GOOGLE,
        email: userInfo.user.email,
        username: userInfo.user.name,
        notification_token:notificationToken
      };
      
      let res: any = await Models.auth.socialSignIn(query);
      await AsyncStorage.setItem('token', res.token);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
      });
      Success(res.message);
      const createChat:any= await Models.chat.createChat({
        users:[ res.data._id,"646489865d00e663e8ff5eeb"]
      })
      console.log('createChat',createChat);
      
      await AsyncStorage.setItem('chat', res.data.role==='farmer shop'?'65151b282fc31248367ab48c':createChat.data._id);
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
        Failure(error);
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className=" w-[100%] h-12 bg-btn-white rounded-lg  items-center flex-row  space-x-5"
      onPress={Platform.OS === 'ios' ? signInIos : signInAndroid}>
      <View className="w-[29%] items-end ">
        <ImageComponent src={Assets.googleIcon} height={24} width={24} svg />
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
