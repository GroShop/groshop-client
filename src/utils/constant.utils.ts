import {getStatusBarHeight} from 'react-native-status-bar-height';
export const statusBarHeight = getStatusBarHeight();

export enum socialLogIn {
  GOOGLE = 'Google',
}

export enum CART {
  PAYMENT_SUCCESS = 'Payment Success',
}

export enum BOOKING_PAYMENT {
  ONLINE_PAYMENT = 'Online Payment',
}
export enum BOOKING {
  ORDERED_PLACED = 'ORDERED PLACED',
  PROCESSING = 'PROCESSING',
  DISPATCH = 'DISPATCH',
  DELIVERED = 'DELIVERED',
  UNABLE_PROCESSING = 'UNABLE PROCESSING',
  DISPATCH_DELAY = 'DISPATCH DELAY',
  CANCELLED = 'CANCELLED',
  QUEUED = 'QUEUED',
}
