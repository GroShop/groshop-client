import {View, Text, Image, , ScrollView} from 'react-native';
import React, {useEffect, useRef, useState, useTransition} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  LottieComponent,
  PrimaryInput,
} from 'utils/imports.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import SocketIOClient from 'socket.io-client';
import {useSelector} from 'react-redux';
import Models from 'imports/models.imports';
import {Failure, useSetState} from 'utils/functions.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {onDisplayNotification} from 'utils/notification.utils';

const ChatScreen = (props: any) => {
  const socket: any = SocketIOClient('http://192.168.0.108:8001', {
    withCredentials: false,
  });
  const auth: any = useSelector((state: any) => state.auth.data);
  const scrollViewRef: Record<string, any> = useRef();

  const [chatMsg, setChatMsg] = useState([]);
  const [chatId, setChatId] = useState('');
  const [trigger, setTrigger] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const chatMessage = async () => {
    try {
      setTrigger(true);
      if (trigger) {
        let query = {
          // users: [auth._id, '646489865d00e663e8ff5eeb'],
          content: watch().message,
          sender: auth._id,
          chat: chatId,
        };
        let res: any = await Models.message.createMessage(query);
        socket.emit('senderMessage', res.data, chatId, auth._id);
        // setChatMsg((pre: any) => [...pre, res.data]);
        setTrigger(false);
      }
    } catch (error: any) {
      // Failure(error.message);
    }
  };

  const getManyMessage = async (chatId: string) => {
    try {
      const res: any = await Models.message.getManyMessage({chat: chatId});
      setChatMsg(res.data);
    } catch (error: any) {
      Failure(error.message);
    }
  };
  useEffect(() => {
    socket.off('receiveMessage').on('receiveMessage', (payload: any) => {
      setChatMsg((pre: any) => [...pre, payload]);
    });
  }, []);

  useEffect(() => {
    (async () => {
      let chat_id: any = await AsyncStorage.getItem('chat');
      getManyMessage(chat_id);
      socket.emit('join-room', chat_id);
      setChatId(chat_id);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd();
    }, 2000);
  }, [chatMsg]);

  return (
    <Container>
      <View className="mx-[20px] flex-1">
        <View className="items-center flex-row justify-center  h-[60px] ">
          <View className="items-center w-[90%] ">
            <Text className="font-raleway-semi-bold text-secondary-black text-[20px]  mr-[15px]">
              Farmer Shop
            </Text>
          </View>
        </View>
        <View className="flex-1 pb-3">
          {_.isEmpty(chatMsg) && (
            <View className="h-full">
              <LottieComponent src={Assets.loader} />
            </View>
          )}
          <ScrollView ref={scrollViewRef}>
            {!_.isEmpty(chatMsg) &&
              chatMsg.map((item: any, index: number) => {
                return auth._id === item.sender ? (
                  <TouchableOpacity
                    className=" flex-row w-full space-x-2 mt-3 "
                    onLongPress={() => {
                      console.log('Long Press');
                    }}
                    delayLongPress={2000}>
                    <View className="flex-1 border-2 border-primary-green  bg-primary-green rounded-lg p-2">
                      <Text className=" font-merriweather-regular text-btn-white text-sm ">
                        {item.content}
                      </Text>
                      <Text className="text-btn-white font-merriweather-regular  text-sm ">
                        {item.created_at}
                      </Text>
                    </View>
                    {!_.isEmpty(auth?.profile_pic) ? (
                      <View className=" w-[44px] rounded-full items-center justify-center ">
                        <ImageComponent
                          src={auth?.profile_pic}
                          height={44}
                          width={44}
                          radius={100}
                        />
                      </View>
                    ) : (
                      <View className="bg-input-bg h-[44px] w-[44px] rounded-full items-center justify-center ">
                        <ImageComponent
                          src={Assets.farmer_shop}
                          height={28}
                          width={28}
                          svg
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className=" flex-row w-full space-x-2 mt-3 "
                    onLongPress={() => {
                      console.log('Long Press');
                    }}
                    delayLongPress={2000}>
                    {/* {!_.isEmpty(state.user?.profile_pic) ? (
            <ImageComponent
              src={state.user?.profile_pic}
              height={36}
              width={36}
              radius={100}
            />
          ) : ( */}
                    <View className="bg-input-bg h-[44px] w-[44px] rounded-full items-center justify-center ">
                      <ImageComponent
                        src={Assets.farmer_shop}
                        height={28}
                        width={28}
                        svg
                      />
                    </View>
                    {/* )} */}
                    <View className="flex-1 border-2 border-primary-green rounded-lg p-2">
                      <Text className=" font-merriweather-regular text-secondary-black text-sm ">
                        {item.content}
                      </Text>
                      <Text className="text-right font-merriweather-regular text-secondary-black text-sm ">
                        {item.created_at}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>

        <View className="h-[40px] mb-7 flex-row w-full items-center justify-center space-x-2">
          <View className="flex-1">
            <PrimaryInput
              type="text"
              placeholder="Type a message"
              control={control}
              name="message"
              inputWrapperStyle="h-[40px]"
              isMultiLine={true}
              // securityPassword={state.passwordIcon}
              // iconOnPress={
              //   state.passwordIcon ? Assets.eyeInActive : Assets.eyeActive
              // }
              // onClick={() => {
              //   setState({passwordIcon: !state.passwordIcon});
              // }}
            />
          </View>
          <TouchableOpacity
            className="h-[40px]  bg-primary-green rounded-lg items-center justify-center w-[40px]"
            onPress={chatMessage}>
            <ImageComponent src={Assets.send_btn} svg height={24} width={24} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            className="h-[40px]  bg-primary-green rounded-lg items-center justify-center w-[40px]"
            onPress={() => onDisplayNotification('Groshop', 'message')}>
            <ImageComponent src={Assets.send_btn} svg height={24} width={24} />
          </TouchableOpacity> */}
        </View>
      </View>
    </Container>
  );
};

export default ChatScreen;
