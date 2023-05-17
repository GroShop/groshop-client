import React, { useState} from 'react';
import { Text,  View} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
const OtpComponent = (props: any) => {
  const [otp, setOtp] = useState('');

  const handleOTPChange = (otp: any) => {
    console.log('OTP entered:', otp);
  };

  return (
    <View className="">
      <OTPTextInput
        handleTextChange={handleOTPChange}
        inputCount={4} // Specify the number of OTP digits
        keyboardType="numeric" // Specify the keyboard type (optional)
        containerStyle={
          {
            justifyContent: 'center',
          }
        }
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
      <Text className="font-merriweather-regular text-right text-xs text-verify my-1">
        Resend in 00:50
      </Text>
    </View>
  );
};

export default OtpComponent;
2;
