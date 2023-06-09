/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import {statusBarHeight} from 'utils/constant.utils';
import {Provider} from 'react-redux';
import store from 'store/store';

const Index = () => {
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
