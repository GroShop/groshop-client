import axios from 'axios';
import {getBaseURL} from './functions.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const instance = () => {
  const data = axios.create({
    baseURL: getBaseURL() + '/api/v1/',
  });
  data.interceptors.request.use(async function (config) {
    const accessToken = await AsyncStorage.getItem('token');
    config.headers['authorization'] = accessToken ? accessToken : '';
    return config;
  });
  return data;
};

export default instance;
