import { View, Text ,SafeAreaView} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from "@react-navigation/stack";
import Splash from './screens/splash/splash.screen';
import 'react-native-gesture-handler';
import Login from './screens/login/login.screen';
import SignIn from './screens/signin/signin.screen';
import ForgotPsd from './screens/phone_num/forgot_password.screen';
const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Test" component={Test} /> */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignIn" component={SignIn} /> 
     <Stack.Screen name="ForgotPsd" component={ForgotPsd} /> 
      {/* <Stack.Screen name="AddPassword" component={AddPassword} /> */}
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App