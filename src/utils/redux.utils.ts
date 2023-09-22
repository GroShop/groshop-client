import store from '../store/store';
import {CART, FILTERPRODUCT, USER, VOUCHER} from './types.utils';

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

export const voucher = (payload: any) => {
  store.dispatch({
    type: VOUCHER,
    payload: payload,
  });
};

export const Cart = (payload: any) => {
  store.dispatch({
    type: CART,
    payload: payload,
  });
};
