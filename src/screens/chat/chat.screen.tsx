import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
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
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';

const ChatScreen = (props: any) => {
  const socket = io('http://192.168.1.20:8001');
  const auth: any = useSelector((state: any) => state.auth.data);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on('chat',(payload:any)=>{
        console.log('payload',payload);
      })
    });
    

  }, [])
  

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
  console.log('watch(',watch());
  
const chatMessage=()=>{

  // socket.emit('chat',{message:watch().message,user_id:auth._id})

}

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
          <ScrollViewComponent inlineStyle={{paddingBottom: 80}}>
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
                  Hey myoui, you get a
                </Text>
                <Text className="text-right font-merriweather-regular text-secondary-black text-sm ">
                  15.33
                </Text>
              </View>
            </TouchableOpacity>
            <View className=" flex-row w-full space-x-2 mt-3 ">
              {/* {!_.isEmpty(state.user?.profile_pic) ? (
            <ImageComponent
              src={state.user?.profile_pic}
              height={36}
              width={36}
              radius={100}
            />
          ) : ( */}

              {/* )} */}
              <View className="flex-1 border-2 border-primary-green  bg-primary-green rounded-lg p-2">
                <Text className=" font-merriweather-regular text-btn-white text-sm ">
                  Hey myoui, you get a
                  jnbkjdnkjfnkjndsfjkndskjnfjknjkfdsndsnjkfdsnkdfnsjkdfnjkdnfdnsfkjn
                  kjdjknsfkjndjkfsnfsjkdmlkmklmkllkdsfmklgmknklsnlkgnlgfnngklngfklngfklgrskngfmflkmkdfsmkldskmsfldkmklmfmkvf
                </Text>
                <Text className="text-btn-white font-merriweather-regular  text-sm ">
                  15.33
                </Text>
              </View>
              <View className="bg-input-bg h-[44px] w-[44px] rounded-full items-center justify-center ">
                <ImageComponent
                  src={Assets.farmer_shop}
                  height={28}
                  width={28}
                  svg
                />
              </View>
            </View>
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
          <TouchableOpacity className="h-[40px]  bg-primary-green rounded-lg items-center justify-center w-[40px]" onPress={chatMessage}>
            <ImageComponent src={Assets.send_btn} svg height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default ChatScreen;
