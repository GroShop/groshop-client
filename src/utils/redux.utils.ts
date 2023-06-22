import store from '../store/store';
import {FILTERPRODUCT, USER} from './types.utils';

export const auth = (payload: any) => {
  store.dispatch({
    type: USER,
    payload: payload,
  });
};
export const filterProduct = (payload: any) => {
  store.dispatch({
    type: FILTERPRODUCT,
    payload: payload,
  });
};

