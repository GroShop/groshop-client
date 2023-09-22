import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Platform} from 'react-native';
import EmailScreen from '../../../screens/email/email.screen';
import HomeScreen from '../../../screens/home/home.screen';
import Notification from 'screens/notification/notification.screen';
import UserScreen from '../../../screens/user/user.screen';
import ImageComponent from '../image/image.component';
import Assets from '../../../imports/assets.imports';
import CartScreen from '../../../screens/cart/cart.screen';

const Tab = createBottomTabNavigator();

const BottomTabs = (props: any) => {
  const CustomBarButton = (props: any) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        top: Platform.OS === 'android' ? -34 : -30,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        shadowColor: '#ACADAC',
      }}>
      <View className="w-[70px] h-[70px] rounded-full bg-primary-green">
        {props.children}
      </View>
    </TouchableOpacity>
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 68 : '10%',
          alignItems: 'center',
          justifyContent: 'center',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: '100%',
          paddingHorizontal: 5,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ImageComponent
              width={focused ? 26 : 30}
              height={focused ? 26 : 30}
              src={focused ? Assets.homeActive : Assets.homeInactive}
              svg
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ImageComponent
              width={focused ? 26 : 30}
              height={focused ? 26 : 30}
              src={
                focused
                  ? Assets.notificationActive
                  : Assets.notificationInactive
              }
              svg
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            props.navigation.navigate('CartScreen');
          },
        }}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ImageComponent width={30} height={30} src={Assets.cartIcon} svg />
          ),
          tabBarButton: (props: any) => <CustomBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ImageComponent
              width={focused ? 26 : 30}
              height={focused ? 26 : 30}
              src={focused ? Assets.messageActive : Assets.messageInactive}
              svg
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ImageComponent
              width={focused ? 26 : 30}
              height={focused ? 26 : 30}
              src={focused ? Assets.profileActive : Assets.profileInactive}
              svg
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
