import Models from '../../imports/models.imports';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import OTPTextInput from 'react-native-otp-textinput';
import {useSelector} from 'react-redux';
import {Failure, Success} from '../../utils/functions.utils';

interface IOtpComponent {
  resendData?: number;
  onOtpChange?: any;
}
const OtpComponent = (props: IOtpComponent) => {
  const [resend, setResend] = useState(60);
  const auth: any = useSelector((state: any) => state.auth.data);

  const handleResendOtp = async () => {
    try {
      let query: any = {
        email: auth.email,
      };
      await Models.auth.sendOtp(query);
      setResend(60);
      resetOtp();
      Success('Otp Resend Successfully');
    } catch (error: any) {
      console.log('error', error);
      Failure(error.message);
    }
  };

  useEffect(() => {
    resetOtp();
  }, []);

  const resetOtp = () => {
    const interval = setInterval(() => {
      setResend(prevResend => {
        if (prevResend === 0) {
          clearInterval(interval);
          return prevResend;
        } else {
          return prevResend - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };

  return (
    <View className="">
      <OTPTextInput
        handleTextChange={props.onOtpChange}
        inputCount={4} // Specify the number of OTP digits
        keyboardType="numeric" // Specify the keyboard type (optional)
        containerStyle={{
          justifyContent: 'center',
        }}
        textInputStyle={{
          width: 45,
          height: 45,
          margin: 8,
          borderWidth: 2,
          borderColor: '#ACADAC',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 2,
          fontFamily: 'Merriweather-Regular',
          fontSize: 18,
          color: '#191A19',
        }}
        tintColor={'#689C36'}
      />
      {resend === 0 ? (
        <TouchableOpacity activeOpacity={0.7} onPress={handleResendOtp}>
          <Text className="font-merriweather-regular text-right text-xs text-primary-green my-1 items-center justify-center">
            Resend Otp
          </Text>
        </TouchableOpacity>
      ) : (
        <Text className="font-merriweather-regular text-right text-xs text-verify my-1 items-center justify-center">
          Resend in 00:{resend}
        </Text>
      )}
    </View>
  );
};

export default OtpComponent;
