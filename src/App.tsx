import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './screens/splash/splash.screen';
import 'react-native-gesture-handler';
import Login from './screens/login/login.screen';
import SignIn from './screens/signin/signin.screen';
import ForgotPsd from './screens/forgot_password/forgot_password.screen';
import ResetPassword from './screens/reset_password/reset_password.screen';
import OtpVerify from './screens/otp_verify/otp_verify.screen';
import Home from './screens/home/home.screen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
         {/* <Stack.Screen name="ForgotPsd" component={ForgotPsd} /> */}
        {/* <Stack.Screen name="OtpVerify" component={OtpVerify} /> */}
        {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
        <Stack.Screen name="Home" component={Home} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
