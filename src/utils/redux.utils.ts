import store from '../store/store';
import {USER} from './types.utils';

export const auth = (payload: any) => {
  store.dispatch({
    type: USER,
    payload: payload,
  });
};
