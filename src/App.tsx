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
import { BottomTabs} from './utils/imports.utils';
import ProductScreen from './screens/product_screen/product.screen';
import FilterSearch from './screens/filter_search/filter_search.screen';
import FilterProduct from './screens/filter_product/filter_product.screen';
import CartScreen from './screens/cart/cart.screen';
import CheckoutScreen from './screens/checkout/checkout.screen';
import WishList from 'screens/wishlist/wishlist.screen';
import Categories from 'screens/categories/categories.screen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name="Splash" component={Splash} /> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={SignIn} />
         <Stack.Screen name="ForgotPsd" component={ForgotPsd} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="FilterSearch" component={FilterSearch} />
        <Stack.Screen name="FilterProduct" component={FilterProduct} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />  
        <Stack.Screen name="WishList" component={WishList} />
        <Stack.Screen name="Categories" component={Categories} />

      </Stack.Navigator>  
    </NavigationContainer>
  );
};

export default App;
