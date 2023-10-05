import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Assets,
  Container,
  ImageComponent,
  PrimaryButton,
  PrimaryInput,
  ScrollViewComponent,
} from 'utils/imports.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import SocketIOClient from 'socket.io-client';
import {useSelector} from 'react-redux';
import Models from 'imports/models.imports';
import {useSetState} from 'utils/functions.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

const ChatScreen = (props: any) => {
  const socket = SocketIOClient('http://192.168.1.18:8001');
  const auth: any = useSelector((state: any) => state.auth.data);
  console.log('');

  const [chatMsg, setChatMsg] = useState([]);
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (payload: any) => {
      setChatMsg((pre: any) => [...pre, payload]);
    });
  }, []);

  useEffect(() => {
    (async () => {
      let chat_id: any = await AsyncStorage.getItem('chat');
      getManyMessage(chat_id);
      socket.emit('join', chat_id);
      setChatId(chat_id);
    })();
  }, []);

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
    let query = {
      // users: [auth._id, '646489865d00e663e8ff5eeb'],
      content: watch().message,
      sender: auth._id,
      chat: chatId,
    };
    let res: any = await Models.message.createMessage(query);
    setChatMsg((pre: any) => [...pre, res.data]);
    socket.emit('senderMessage', res.data);
  };

  const getManyMessage = async (chatId: string) => {
    try {
      const res: any = await Models.message.getManyMessage({chat: chatId});
      setChatMsg(res.data);
    } catch (error: any) {
      // Failure(error.message);
    }
  };


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
        <View className="flex-1">
          <ScrollViewComponent>
            {chatMsg.map((item: any, index: number) => {
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
                    <View className=" h-[44px] w-[44px] rounded-full items-center justify-center ">
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
          </ScrollViewComponent>
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
        </View>
      </View>
    </Container>
  );
};

export default ChatScreen;
