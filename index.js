/**
 * @format
 */

import {AppRegistry,Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import {statusBarHeight} from 'utils/constant.utils';
import {Provider} from 'react-redux';
import store from 'store/store';
import messaging from '@react-native-firebase/messaging';
const Index = () => {

// // Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent('Groshop', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('Groshop');
    AppRegistry.runApplication('Groshop', { rootTag });
}

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <App />
        <FlashMessage
          position={
            Platform.OS === 'ios' ? 'top' : {top: 50, left: 0, right: 0}
          }
          statusBarHeight={statusBarHeight}
          floating={Platform.OS !== 'ios'}
        />
      </SafeAreaProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Index);
